const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper: generate 6-digit OTP
const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: sign JWT
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

/**
 * POST /api/auth/send-otp
 * Body: { phone }
 * In production: integrate SMS gateway (Twilio, MSG91, etc.)
 */
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone || !/^[6-9]\d{9}$/.test(phone))
    return res.status(400).json({ message: 'Invalid phone number' });

  try {
    const otp = genOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Upsert user
    await User.findOneAndUpdate(
      { phone },
      { otp, otpExpiry },
      { upsert: true, new: true }
    );

    // TODO: Send real OTP via SMS gateway
    // For demo: return OTP in response (REMOVE IN PRODUCTION)
    console.log(`OTP for ${phone}: ${otp}`);
    res.json({ message: 'OTP sent', demo_otp: otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { phone, otp }
 */
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ message: 'Phone and OTP required' });

  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || user.otpExpiry < new Date())
      return res.status(400).json({ message: 'Invalid or expired OTP' });

    // Clear OTP after use
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      token: signToken(user._id),
      user: { _id: user._id, phone: user.phone, name: user.name, location: user.location },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PUT /api/auth/profile
 * Update user name/location
 */
const { protect } = require('../middleware/auth');
router.put('/profile', protect, async (req, res) => {
  const { name, location } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, location },
      { new: true }
    ).select('-otp -otpExpiry');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
