const Stripe = require("stripe");
const Mailer = require("./mailer");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  static async createPaymentIntent(amount, currency, email) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { email },
    });
    return paymentIntent;
  }

  static constructWebhookEvent(body, signature, secret) {
    return stripe.webhooks.constructEvent(body, signature, secret);
  }

  static sendReceipt(email, receiptDetails) {
    Mailer.sendReceipt(email, receiptDetails);
  }
}

module.exports = PaymentService;
