const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },

    relation: {
      type: String,
      enum: ['Son', 'Daughter', 'Spouse', 'Parent', 'Sibling', 'Other'],
      required: true,
    },

    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    bloodGroup: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);
