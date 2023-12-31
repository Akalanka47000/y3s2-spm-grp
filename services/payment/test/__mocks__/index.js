export const mockInitiatePaymentRequestBody = {
  amount: 100,
  customer: {
    name: 'Shifan',
    address: 'Dehiwala',
  },
};

export const mockTransferPaymentRequestBody = {
  amount: 100,
  destination_account_id: 'acc_3x32fsdv',
};

export const mockCustomer = {
  id: 'cus_9s6XWPuHZWFcfK',
  object: 'customer',
  address: null,
  balance: 0,
  created: 1483565364,
  currency: 'usd',
  default_source: 'card_1N1kTU2eZvKYlo2CoGgkHIol',
  delinquent: false,
  description: null,
  discount: null,
  email: null,
  invoice_prefix: 'C28F7E1',
  invoice_settings: {
    custom_fields: null,
    default_payment_method: null,
    footer: null,
    rendering_options: null,
  },
  livemode: false,
  metadata: {
    order_id: '6735',
  },
  name: null,
  next_invoice_sequence: 3,
  phone: null,
  preferred_locales: [],
  shipping: null,
  tax_exempt: 'none',
  test_clock: null,
};

export const mockPaymentIntent = {
  id: 'pi_1Gszag2eZvKYlo2Cgll8N5es',
  object: 'payment_intent',
  amount: 1000,
  amount_capturable: 0,
  amount_details: {
    tip: {},
  },
  amount_received: 0,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  client_secret: 'pi_1Gszag2eZvKYlo2Cgll8N5es_secret_hzCSeEJeQ8wRNDR4P0JEOVnNA',
  confirmation_method: 'automatic',
  created: 1591917226,
  currency: 'usd',
  customer: null,
  description: 'Created by stripe.com/docs demo',
  invoice: null,
  last_payment_error: null,
  latest_charge: null,
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: 'automatic',
    },
  },
  payment_method_types: ['card'],
  processing: null,
  receipt_email: null,
  redaction: null,
  review: null,
  setup_future_usage: null,
  shipping: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'requires_payment_method',
  transfer_data: null,
  transfer_group: null,
};

export const mockTransfer = {
  id: 'tr_3N2oUx2eZvKYlo2C0JhDtKjm',
  object: 'transfer',
  amount: 1303,
  amount_reversed: 0,
  balance_transaction: 'txn_1032Rp2eZvKYlo2CpErRBj09',
  created: 1682915900,
  currency: 'usd',
  description: null,
  destination: 'acct_1MMLi1Gf4BMpgHRX',
  destination_payment: 'py_1N2oVEGf4BMpgHRXgh9JKNe1',
  livemode: false,
  metadata: {},
  reversals: {
    object: 'list',
    data: [],
    has_more: false,
    url: '/v1/transfers/tr_3N2oUx2eZvKYlo2C0JhDtKjm/reversals',
  },
  reversed: false,
  source_transaction: 'ch_3N2oUx2eZvKYlo2C0VEQcUl4',
  source_type: 'card',
  transfer_group: 'group_pi_3N2oUx2eZvKYlo2C0P7zvHke',
};
