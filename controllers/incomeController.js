const Income = require('../models/Income');

exports.createIncome = async (req, res) => {
  try {
    const income = new Income({ ...req.body, userId: req.user.id });
    await income.save();
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// // UPDATE income
// exports.updateIncome = async (req, res) => {
//   try {
//     const income = await Income.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );
//     if (!income) return res.status(404).json({ message: 'Income not found' });
//     res.json(income);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// controllers/incomeController.js
exports.updateIncome = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const income = await Income.findOneAndUpdate(query, req.body, {
      new: true,
    });

    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // DELETE income
// exports.deleteIncome = async (req, res) => {
//   try {
//     const income = await Income.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id
//     });
//     if (!income) return res.status(404).json({ message: 'Income not found' });
//     res.json({ message: 'Income deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.deleteIncome = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const income = await Income.findOneAndDelete(query);

    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// FILTER by date range
exports.getIncomesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const incomes = await Income.find({
      userId: req.user.id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOTAL income
exports.getIncomeSummary = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    res.json({ totalIncome });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().populate('userId', 'name email');
    res.json(incomes);
  } catch (err) {
    console.error('Error fetching admin incomes:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
