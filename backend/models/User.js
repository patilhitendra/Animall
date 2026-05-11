const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[6-9]\d{9}$/, // Indian mobile number
  },
  name: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  // OTP fields (in production, use Redis with TTL)
  otp: String,
  otpExpiry: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
