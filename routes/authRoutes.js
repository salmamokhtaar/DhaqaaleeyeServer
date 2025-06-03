const express = require('express');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const User = require('../models/User');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// ✅ Get all users (Admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user (Admin only)
router.put('/:id', auth, admin, async (req, res) => {
  const { name, email, profileImage, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, profileImage, role },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete user (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});


module.exports = router;
