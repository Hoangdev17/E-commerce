const express = require('express');
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
  addOrUpdateReview,
  getProductById,
  getReviews,
  uploadAvatar,
  get4Products,
  
} = require('../controllers/productController');
const authenticate = require('../middleware/authMiddleware.js'); // Middleware xác thực người dùng
const authorizeAdmin = require('../middleware/roleMiddleware.js'); // Middleware kiểm tra quyền admin
const upload = require('../middleware/upload.js');

const router = express.Router();

// Thêm sản phẩm (chỉ cho phép admin)
router.post('/add', authenticate, authorizeAdmin, addProduct);

// Lấy danh sách sản phẩm (có thể không cần xác thực nếu mọi người đều có quyền truy cập)
router.get('/', getProducts);

// Cập nhật sản phẩm (chỉ cho phép admin)
router.put('/:productId', authenticate, authorizeAdmin, updateProduct);

// Xóa sản phẩm (chỉ cho phép admin)
router.delete('/:productId', authenticate, authorizeAdmin, deleteProduct);

// Cập nhật số lượng kho (chỉ cho phép admin)
router.patch('/:productId/stock', authenticate, authorizeAdmin, updateStock);

router.post('/:id/reviews', authenticate, addOrUpdateReview);

router.get('/:id/getreviews', getReviews);

router.get('/:id', authenticate, getProductById);

router.post('/upload/:id', upload.single('avatar'),authenticate, uploadAvatar);

router.get("/get4", get4Products);

module.exports = router;
