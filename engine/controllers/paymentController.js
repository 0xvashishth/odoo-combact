const PaymentService = require("../services/paymentService");

class PaymentController {
  static async createPaymentIntent(req, res) {
    const { amount, currency, email } = req.body;
    try {
      const paymentIntent = await PaymentService.createPaymentIntent(
        amount,
        currency,
        email
      );
      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = PaymentController;
