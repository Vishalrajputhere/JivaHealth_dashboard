const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true }, // in INR
  },
  { _id: false } // don't need an id for each item
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // shown as "Order #1", "Order #2" etc.
    orderNumber: { type: Number, required: true },

    items: [OrderItemSchema],

    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },

    statusNote: { type: String, default: '' },

    orderedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
