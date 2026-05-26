const express = require('express');
const router = express.Router();
const {
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
