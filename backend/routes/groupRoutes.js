const express = require('express');
const { 
  createGroup, 
  getGroups, 
  getGroup, 
  addMember 
} = require('../controllers/groupController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createGroup)
  .get(getGroups);

router.route('/:id')
  .get(getGroup);

router.route('/:id/members')
  .post(addMember);

module.exports = router;