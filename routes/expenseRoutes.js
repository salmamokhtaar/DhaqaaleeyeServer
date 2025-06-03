const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpensesByDateRange,
  getExpenseSummary,
  getAllExpenses
} = require('../controllers/expenseController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// ✅ Authenticated routes
router.post('/', auth, createExpense);
router.get('/', auth, getExpenses);
router.get('/filter', auth, getExpensesByDateRange);
router.get('/summary', auth, getExpenseSummary);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

// ✅ Admin-only route
router.get('/admin', auth, admin, getAllExpenses);

module.exports = router;
