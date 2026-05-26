const User = require('../models/User');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const FamilyMember = require('../models/FamilyMember');

// GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    // build query filter
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All Status') {
      filter.status = status;
    }

    const users = await User.find(filter).sort({ createdAt: -1 });

    // also get counts for the stat cards at the top of the page
    const totalUsers = await User.countDocuments();
    const primeUsers = await User.countDocuments({ isPrime: true });
    const nonPrimeUsers = await User.countDocuments({ isPrime: false });
    const totalFamilyMembers = await FamilyMember.countDocuments();

    res.status(200).json({
      success: true,
      stats: { totalUsers, primeUsers, nonPrimeUsers, totalFamilyMembers },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const orders = await Order.find({ userId: req.params.id }).sort({ orderedAt: -1 });
    const payments = await Payment.find({ userId: req.params.id }).sort({ paidAt: -1 });
    const familyMembers = await FamilyMember.find({ userId: req.params.id });

    // calculate total spent from completed payments only
    const totalSpent = payments
      .filter((p) => p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        user,
        orders,
        payments,
        familyMembers,
        totalSpent,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/users
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // delete their data too so we don't leave orphaned records in the db
    await Order.deleteMany({ userId: req.params.id });
    await Payment.deleteMany({ userId: req.params.id });
    await FamilyMember.deleteMany({ userId: req.params.id });
    await user.deleteOne();

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id/upgrade-prime
const upgradeToPrime = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isPrime: true, userType: 'Prime User' },
      { new: true }
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id/revert-prime
const revertToNormal = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isPrime: false, userType: 'Normal User' },
      { new: true }
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  upgradeToPrime,
  revertToNormal,
};
