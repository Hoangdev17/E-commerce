import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],

    shippingAddress: shippingAddressSchema,

    paymentMethod: {
      type: String,
      enum: ['COD', 'Stripe', 'PayPal'],
      default: 'COD',
    },

    status: {
      type: String,
      enum: ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao', 'Đã hủy'],
      default: 'Chờ xác nhận',
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    deliveredAt: Date, // thời gian giao hàng thành công
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
