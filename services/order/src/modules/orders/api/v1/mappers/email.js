export const constructReceiptEmailPayload = (email, order) => ({
  template: 'payment_confirmation',
  data: {
    order_id: order._id,
    total: `LKR ${order.total.toFixed(2)}`,
  },
  options: {
    to: [email],
    subject: 'IShop 2.0 Payment Receipt',
  },
});
