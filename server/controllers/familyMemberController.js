const FamilyMember = require('../models/FamilyMember');
const User = require('../models/User');

// GET /api/family/user/:userId
const getFamilyMembers = async (req, res, next) => {
  try {
    const members = await FamilyMember.find({ userId: req.params.userId });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

// POST /api/family
const addFamilyMember = async (req, res, next) => {
  try {
    const member = await FamilyMember.create(req.body);

    // we don't store a cached count on the user doc right now
    // but we could increment it here later if needed

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// PUT /api/family/:id
const updateFamilyMember = async (req, res, next) => {
  try {
    const member = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      res.status(404);
      throw new Error('Family member not found');
    }

    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/family/:id
const deleteFamilyMember = async (req, res, next) => {
  try {
    const member = await FamilyMember.findByIdAndDelete(req.params.id);

    if (!member) {
      res.status(404);
      throw new Error('Family member not found');
    }

    res.status(200).json({ success: true, message: 'Family member removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
};
