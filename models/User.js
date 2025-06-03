const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
