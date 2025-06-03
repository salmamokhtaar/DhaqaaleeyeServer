const Expense = require('../models/Expense');
const admin = require('../middleware/adminMiddleware');
exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, userId: req.user.id });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// // UPDATE expense
// exports.updateExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );
//     if (!expense) return res.status(404).json({ message: 'Expense not found' });
//     res.json(expense);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.updateExpense = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const expense = await Expense.findOneAndUpdate(query, req.body, { new: true });

    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const expense = await Expense.findOneAndDelete(query);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

// // DELETE expense
// exports.deleteExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id
//     });
//     if (!expense) return res.status(404).json({ message: 'Expense not found' });
//     res.json({ message: 'Expense deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// FILTER by date range
exports.getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const expenses = await Expense.find({
      userId: req.user.id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOTAL expense
exports.getExpenseSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    res.json({ totalExpense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('userId', 'name email'); // ✅ fixed
    res.json(expenses);
  } catch (err) {
    console.error('Error in getAllExpenses:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};