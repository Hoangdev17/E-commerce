const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Đảm bảo rằng bạn có model User

// Middleware xác thực người dùng
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lấy user từ DB bằng ID từ token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Lưu thông tin người dùng vào req.user
    req.user = user;
    next(); // Tiếp tục đến route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
