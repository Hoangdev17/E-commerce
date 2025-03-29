import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Không có sản phẩm trong đơn hàng' });
    }

    // Tính tổng tiền
    let totalPrice = 0;
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error('Sản phẩm không tồn tại');
        totalPrice += product.price * item.quantity;
        return {
          productId: product._id,
          productName: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const order = new Order({
      userId: req.user._id,
      items: populatedItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Đơn hàng đã được tạo',
      orderId: order._id,
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết đơn hàng
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra quyền truy cập: user chỉ xem được đơn của chính họ
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập đơn hàng này' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status || order.status;
  const updated = await order.save();
  res.json(updated);
};

export const getOrders = async (req, res) => {
  try {
    // Kiểm tra xem _id có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "User ID không hợp lệ" });
    }

    // Tìm tất cả đơn hàng của userId
    const orders = await Order.find({ userId: req.user.id })
      .populate('userId', 'name email') // Lấy thông tin user đi kèm
      .sort({ createdAt: -1 }).limit(6); // Sắp xếp mới nhất trước

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Lỗi lấy đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng' });
  }
};