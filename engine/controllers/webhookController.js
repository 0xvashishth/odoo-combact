const PaymentService = require("../services/paymentService");

class WebhookController {
  static handleWebhook(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = PaymentService.constructWebhookEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const email = paymentIntent.metadata.email;
      const receiptDetails = `
                Amount: ${(paymentIntent.amount / 100).toFixed(
                  2
                )} ${paymentIntent.currency.toUpperCase()}
                Payment ID: ${paymentIntent.id}
                Payment Date: ${new Date(
                  paymentIntent.created * 1000
                ).toLocaleString()}
            `;
      PaymentService.sendReceipt(email, receiptDetails);
    }

    res.status(200).end();
  }
}

module.exports = WebhookController;
