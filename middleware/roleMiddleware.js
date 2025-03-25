// Middleware kiểm tra quyền admin
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }
    next(); // Nếu là admin, tiếp tục đến route handler
  };
  
  module.exports = authorizeAdmin;
  