const User = require('../models/User');

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden. Admins only.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error in admin middleware' });
  }
};

module.exports = admin;
