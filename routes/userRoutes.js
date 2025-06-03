// routes/userRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const User = require('../models/User');

const router = express.Router();


router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error in GET /api/users:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// ✅ Admin only route
router.get('/', auth, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
router.get('/', auth, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.put('/:id', auth, admin, async (req, res) => {
  const { name, email, profileImage, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, profileImage, role },
    { new: true }
  ).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.delete('/:id', auth, admin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

module.exports = router;
