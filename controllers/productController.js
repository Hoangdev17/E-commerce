const Product = require('../models/Product.js');

// Thêm sản phẩm mới
const addProduct = async (req, res) => {
  const { name, description, price, quantity, category, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  const { category, name } = req.query; // Lọc theo danh mục và tên sản phẩm

  try {
    let query = {deleted: false};

    if (category) {
      query.category = category;
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Tìm kiếm không phân biệt chữ hoa chữ thường
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, quantity, category, image } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.category = category || product.category;
    product.image = image || product.image;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Tìm và xóa mềm sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.delete(); 

    return res.status(200).json({ message: 'Product soft deleted successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật số lượng sản phẩm trong kho
const updateStock = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity = quantity;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 const addOrUpdateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    const existingReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      // ✅ Người dùng đã đánh giá → cập nhật lại
      existingReview.rating = Number(rating);
      existingReview.comment = comment;
    } else {
      // ✅ Người dùng chưa đánh giá → thêm mới
      const newReview = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
      };
      product.reviews.push(newReview);
    }

    // Cập nhật tổng số đánh giá và điểm trung bình
    product.numReviews = product.reviews.length;
    product.averageRating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Đánh giá đã được cập nhật/thêm mới thành công' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });

    // Tính rating trung bình
    const averageRating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        : 0;

    return res.json({ reviews: product.reviews, averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

 const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
    }

    const imageUrl = req.file.path;

    const productId = req.params.id; 

    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { image: imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }

    res.json({ success: true, image: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi khi tải ảnh', error: err.message });
  }
};


module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
  addOrUpdateReview,
  getProductById,
  getReviews,
  uploadAvatar
};
