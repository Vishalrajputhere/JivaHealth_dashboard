const express = require('express');
const router = express.Router();
const {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} = require('../controllers/familyMemberController');

router.post('/', addFamilyMember);
router.get('/user/:userId', getFamilyMembers);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

module.exports = router;
