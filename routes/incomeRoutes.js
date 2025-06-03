const express = require('express');
const admin = require('../middleware/adminMiddleware');
const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
  getIncomesByDateRange,
  getIncomeSummary
} = require('../controllers/incomeController');
const { getAllIncomes } = require('../controllers/incomeController');

const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createIncome);
router.get('/', auth, getIncomes);
router.get('/filter', auth, getIncomesByDateRange);
router.get('/summary', auth, getIncomeSummary);
router.put('/:id', auth, updateIncome);
router.delete('/:id', auth, deleteIncome);
router.get('/admin', auth, admin, getAllIncomes);
module.exports = router;

