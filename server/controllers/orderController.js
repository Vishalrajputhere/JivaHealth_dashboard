const Order = require('../models/Order');

// GET /api/orders/user/:userId
const getOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      orderedAt: -1,
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrdersByUser, createOrder, updateOrder, deleteOrder };
