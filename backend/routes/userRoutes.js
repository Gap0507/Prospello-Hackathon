const express = require('express');
const { getUsers, addFriend, getFriends } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getUsers);
router.route('/friends').post(addFriend).get(getFriends);

module.exports = router;