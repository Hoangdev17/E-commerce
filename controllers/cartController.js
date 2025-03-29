import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Stripe from "stripe";
const stripe = Stripe("sk_test_51R74zk1csJvkHuz6mfUqBVpzdtZTJOFGTbbNZxidQsHJHGVa7qHXgwxe0xirjHcsVeWQMp9oIV5EtEZZRmAKa4u600qd9NUghZ");
import sendEmail from "../utils/sendEmail.js";

// Thêm sản phẩm vào giỏ
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    const item = {
      productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      totalPrice: product.price * quantity
    };

    if (!cart) {
      cart = new Cart({
        userId,
        items: [item],
        totalItems: quantity,
        totalPrice: item.totalPrice
      });
    } else {
      const index = cart.items.findIndex(i => i.productId.toString() === productId);
      if (index >= 0) {
        // Update số lượng
        cart.items[index].quantity += quantity;
        cart.items[index].totalPrice = cart.items[index].quantity * cart.items[index].price;
      } else {
        cart.items.push(item);
      }
    }

    // Tính lại tổng
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.totalPrice, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật số lượng
export const updateQuantity = async (req, res) => {
  try {
    const {  productId, quantity } = req.body;
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(i => i.productId.toString() === productId);
    if (index < 0) return res.status(404).json({ message: "Product not in cart" });

    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
      cart.items[index].totalPrice = quantity * cart.items[index].price;
    }

    // Cập nhật tổng
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.totalPrice, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.id;

    // Validate inputs
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    if (!userId) {
      return res.status(401).json({ message: "User authentication required" });
    }

    // Find cart with lean() for better performance if we only need to read
    const cart = await Cart.findOne({ userId }).exec();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if item exists before filtering
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove item using splice for single item removal
    cart.items.splice(itemIndex, 1);

    // Recalculate totals with proper type checking
    cart.totalItems = cart.items.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 0);
    }, 0);
    
    cart.totalPrice = cart.items.reduce((sum, item) => {
      return sum + (Number(item.totalPrice) || 0);
    }, 0);

    // Save with validation
    const updatedCart = await cart.save();
    return res.status(200).json({
      success: true,
      data: updatedCart
    });

  } catch (error) {
    // Log error for debugging (in production, use proper logging)
    console.error('Remove from cart error:', error);
    
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};




// Lấy chi tiết giỏ hàng
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Trả thẳng về cart không filter gì cả
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tính tổng tiền giỏ hàng
export const getCartTotal = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json({ totalPrice: cart.totalPrice, totalItems: cart.totalItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkOut = async (req, res) => {
  const { amount, name } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name || "Sản phẩm không tên", // Đảm bảo có tên sản phẩm
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const checkOutByCOD = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.productId,
      productName: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.amount,
      paymentMethod: "COD",
      status: 'Chờ xác nhận',
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }, 
        { new: true }
      );
    }

    cart.items = [];
    await cart.save();

    // Gửi email xác nhận đơn hàng
    const productListHTML = orderItems
      .map(
        (item) =>
          `<li>${item.quantity} x ${item.productName || "Sản phẩm"} - ${(item.price).toLocaleString()}đ</li>`
      )
      .join("");

    const emailContent = `
      <h3>Cảm ơn bạn đã đặt hàng tại E-Shop!</h3>
      <p>Chúng tôi đã nhận được đơn hàng của bạn:</p>
      <ul>${productListHTML}</ul>
      <p><strong>Tổng tiền:</strong> ${req.body.amount.toLocaleString()} VNĐ</p>
      <p><strong>Địa chỉ giao hàng:</strong> ${req.body.shippingAddress.address}</p>
      <p>Chúng tôi sẽ xử lý và giao hàng sớm nhất có thể.</p>
      <br />
      <p>Trân trọng,<br />E-Shop</p>
    `;

    const user = req.user; // giả sử middleware auth đã gán user vào req

    if (user?.email) {
      await sendEmail(user.email, "Xác nhận đơn hàng tại E-Shop", emailContent);
    }

    return res.status(201).json({ message: "Order placed successfully", order: newOrder, success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


