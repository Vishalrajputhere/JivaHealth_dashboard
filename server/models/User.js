const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Home' },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'India' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true },

    // role = the badge shown on each user card
    role: {
      type: String,
      enum: ['Patient', 'Doctor', 'Nurse', 'Staff'],
      default: 'Patient',
    },
    userType: {
      type: String,
      enum: ['Normal User', 'Prime User'],
      default: 'Normal User',
    },
    isPrime: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    lastActive: { type: Date, default: Date.now },

    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String }, // e.g. "O+", "A-"

    addresses: [AddressSchema],

    // pre-cached so we don't run aggregations on every list render
    appointmentCount: { type: Number, default: 0 },
    lastAppointmentDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
