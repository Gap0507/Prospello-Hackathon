const Group = require('../models/Group');

// @desc    Create group
// @route   POST /api/groups
// @access  Private
exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;

    // Create group
    const group = await Group.create({
      name,
      description,
      creator: req.user.id,
      members: [
        { user: req.user.id },
        ...(members || []).map(member => ({ user: member }))
      ]
    });

    res.status(201).json({
      success: true,
      data: group
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all groups
// @route   GET /api/groups
// @access  Private
exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({
      'members.user': req.user.id
    }).populate('members.user', 'name email');

    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single group
// @route   GET /api/groups/:id
// @access  Private
exports.getGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('members.user', 'name email')
      .populate('creator', 'name email');

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    // Check if user is a member of the group
    const isMember = group.members.some(member => 
      member.user._id.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this group' });
    }

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add member to group
// @route   POST /api/groups/:id/members
// @access  Private
exports.addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    // Check if user is the creator of the group
    if (group.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only the creator can add members in the group' });
    }

    // Check if user is already a member
    const isMember = group.members.some(member => 
      member.user.toString() === userId
    );

    if (isMember) {
      return res.status(400).json({ success: false, message: 'User is already a member of this group' });
    }

    // Add member
    group.members.push({ user: userId });
    await group.save();

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (error) {
    next(error);
  }
};