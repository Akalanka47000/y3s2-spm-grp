import createError from 'http-errors';
import { groupBy } from 'lodash';
import { traced } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { orderStatuses } from '@app/constants';
import { createOrder, getAllOrders, getSingleOrder, deleteSingleOrder, updateSingleOrder } from '../../repository';
import { getPayment, getProductsByIds, getUserById, makePayment, sendEmail, transferPayment } from '../../../../services';
import { calculateTotals } from './helpers/index';
import { constructReceiptEmailPayload } from './mappers';

const logger = moduleLogger('order-service');

export const serviceCreateOrder = async (order) => {
  await traced(calculateTotals)(order);
  return traced(createOrder)(order);
};

export const serviceGetAllOrders = (filters, sorts, page, limit) => {
  return traced(getAllOrders)({ filters, sorts, page, limit });
};

export const serviceGetSingleOrder = (id) => {
  return traced(getSingleOrder)(id);
};

export const serviceDeleteSingleOrder = (id) => {
  return traced(deleteSingleOrder)(id);
};

export const serviceUpdateSingleOrder = async (id, payload) => {
  await traced(calculateTotals)(payload);
  return traced(updateSingleOrder)(id, payload);
};

export const serviceInitiateOrderPayment = async (id, userId) => {
  const order = await serviceGetSingleOrder(id);
  if (!order) {
    throw createError(404, 'Order not found');
  }
  const payment = await traced(makePayment)({
    amount: order.total,
    metadata: {
      order_id: id,
      user_id: userId,
    },
  });
  serviceUpdateSingleOrder(id, { payment_id: payment.id });
  return payment;
};

export const serviceVerifyOrderPayment = async (id) => {
  const order = await serviceGetSingleOrder(id);
  if (!order) {
    throw createError(404, 'Order not found');
  }
  const payment = await getPayment(order.payment_id);
  if (payment.status === 'succeeded') {
    serviceUpdateSingleOrder(id, { status: orderStatuses.paid });
    getUserById(order.user).then((customer) => sendEmail(constructReceiptEmailPayload(customer.email, order)));
    const products = await getProductsByIds(order.products.map((product) => product._id));
    const sellers = groupBy(products, (product) => product.seller);
    Object.keys(sellers).forEach(async (seller) => {
      seller = await getUserById(seller);
      if (!seller.business?.bank_account) return logger.warn('seller bank account not configured, payment transfer skipped');
      const transferAmount = sellers[seller].reduce((total, product) => {
        total += product.markup_price * order.products.find((pId) => pId === product._id).quantity ?? 1;
        return total;
      }, 0);
      traced(transferPayment)({
        amount: transferAmount,
        destination_account_id: seller.business?.bank_account,
      }).then((data) => serviceUpdateSingleOrder(id, { payment_transfer_id: data.id }));
    });
    return { payment_status: true };
  }
  return { payment_status: false };
};
