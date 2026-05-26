const Payment = require('../models/Payment');

// GET /api/payments/user/:userId
const getPaymentsByUser = async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId }).sort({
      paidAt: -1,
    });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

// POST /api/payments
const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/payments/:id
const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      res.status(404);
      throw new Error('Payment not found');
    }

    res.status(200).json({ success: true, message: 'Payment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPaymentsByUser, createPayment, deletePayment };
