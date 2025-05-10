const Expense = require('../models/Expense');
const Group = require('../models/Group');

// @desc    Create expense
// @route   POST /api/expenses
// @access  Private
exports.createExpense = async (req, res, next) => {
  try {
    const { title, amount, paidBy, group, splitBetween, notes, date } = req.body;

    // If group is provided, check if user is a member
    if (group) {
      const groupDoc = await Group.findById(group);
      if (!groupDoc) {
        return res.status(404).json({ success: false, message: 'Group not found' });
      }

      const isMember = groupDoc.members.some(member => 
        member.user.toString() === req.user.id
      );

      if (!isMember) {
        return res.status(403).json({ success: false, message: 'Not authorized to add expenses to this group' });
      }
    }

    // Create expense
    const expense = await Expense.create({
      title,
      amount,
      paidBy,
      group,
      splitBetween,
      notes,
      date: date || Date.now(),
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
exports.getExpenses = async (req, res, next) => {
  try {
    let query = {};

    // Filter by group if provided
    if (req.query.group) {
      query.group = req.query.group;
    }

    // Filter expenses where user is involved (either paid or part of split)
    query.$or = [
      { paidBy: req.user.id },
      { 'splitBetween.user': req.user.id }
    ];

    const expenses = await Expense.find(query)
      .populate('paidBy', 'name email')
      .populate('splitBetween.user', 'name email')
      .populate('group', 'name')
      .sort('-date');

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get balances
// @route   GET /api/expenses/balances
// @access  Private
exports.getBalances = async (req, res, next) => {
  try {
    // Get all expenses where the user is involved
    const expenses = await Expense.find({
      $or: [
        { paidBy: req.user.id },
        { 'splitBetween.user': req.user.id }
      ]
    })
    .populate('paidBy', 'name email')
    .populate('splitBetween.user', 'name email');

    // Calculate balances
    const balances = {};

    expenses.forEach(expense => {
      const paidById = expense.paidBy._id.toString();
      
      // Process each split
      expense.splitBetween.forEach(split => {
        const userId = split.user._id.toString();
        const amount = split.amount;

        // Skip if the user is paying themselves
        if (paidById === userId) return;

        // Initialize balance entries if they don't exist
        if (!balances[paidById]) balances[paidById] = { user: expense.paidBy, amount: 0 };
        if (!balances[userId]) balances[userId] = { user: split.user, amount: 0 };

        // If current user paid
        if (paidById === req.user.id) {
          balances[userId].amount -= amount; // Others owe user
        } 
        // If current user owes
        else if (userId === req.user.id) {
          balances[paidById].amount += amount; // User owes others
        }
      });
    });

    // Format the response
    const formattedBalances = {
      youOwe: [],
      youAreOwed: []
    };

    Object.keys(balances).forEach(userId => {
      if (userId === req.user.id) return; 
      
      const balance = balances[userId];
      if (balance.amount > 0) {
        formattedBalances.youOwe.push({
          user: balance.user,
          amount: balance.amount
        });
      } else if (balance.amount < 0) {
        formattedBalances.youAreOwed.push({
          user: balance.user,
          amount: Math.abs(balance.amount)
        });
      }
    });

    res.status(200).json({
      success: true,
      data: formattedBalances
    });
  } catch (error) {
    next(error);
  }
};