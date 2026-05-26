const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // linked order, can be null for things like standalone consultation fees
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
    },

    type: {
      type: String,
      enum: [
        'Consultation Fee',
        'Lab Test',
        'Medicine Order',
        'Ambulance',
        'Other',
      ],
      required: true,
    },

    description: { type: String, default: '' },

    amount: { type: Number, required: true }, // in rupees

    method: {
      type: String,
      enum: ['UPI', 'Card', 'Net Banking', 'Cash', 'Wallet'],
      default: 'UPI',
    },

    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Failed', 'Refunded'],
      default: 'Completed',
    },

    paidAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
