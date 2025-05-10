const express = require('express');
const { 
  createExpense, 
  getExpenses, 
  getBalances 
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createExpense)
  .get(getExpenses);

router.route('/balances')
  .get(getBalances);

module.exports = router;