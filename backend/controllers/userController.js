const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add friend
// @route   POST /api/users/friends
// @access  Private
exports.addFriend = async (req, res, next) => {
  try {
    const { friendId } = req.body;

    // Check if friend exists
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if already friends
    const user = await User.findById(req.user.id);
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ success: false, message: 'Already friends with this user' });
    }

    // Add friend to user's friends list
    user.friends.push(friendId);
    await user.save();

    // Add user to friend's friends list
    friend.friends.push(req.user.id);
    await friend.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get friends
// @route   GET /api/users/friends
// @access  Private
exports.getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'name email');

    res.status(200).json({
      success: true,
      count: user.friends.length,
      data: user.friends
    });
  } catch (error) {
    next(error);
  }
};