const Product = require('../models/Product');

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

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
};
