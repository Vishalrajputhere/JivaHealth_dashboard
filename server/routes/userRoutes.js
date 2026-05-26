const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  upgradeToPrime,
  revertToNormal,
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/upgrade-prime', upgradeToPrime);
router.put('/:id/revert-prime', revertToNormal);

module.exports = router;
