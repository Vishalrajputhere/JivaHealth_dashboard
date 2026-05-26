const express = require('express');
const router = express.Router();
const {
  getPaymentsByUser,
  createPayment,
  deletePayment,
} = require('../controllers/paymentController');

router.post('/', createPayment);
router.get('/user/:userId', getPaymentsByUser);
router.delete('/:id', deletePayment);

module.exports = router;
