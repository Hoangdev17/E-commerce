const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0, // Số lượng sản phẩm trong kho
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Beauty', 'Home', 'Sports', 'Apple'], 
  },
  image: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

ProductSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
