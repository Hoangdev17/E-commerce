const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema(
    {
      firebaseUid: {
        type: String,
        unique: true,
        sparse: true, // ✅ Cho phép nhiều document không có field này
      },
      name: {
        type: String,
        required: false,
        default: ''
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: false,
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', 
      },
      isVerified: {
        type: Boolean,
        default: false, 
      },
      profilePicture: {
        type: String, 
      },
      addresses: [
        {
          name: String,
          street: String,
          city: String,
          state: String,
          country: String,
          postalCode: String,
          phone: String,
          isPrimary: {
            type: Boolean,
            default: false, // Địa chỉ chính của người dùng
          },
        },
      ],
      orderHistory: [
        {
          orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
          },
          date: {
            type: Date,
            default: Date.now,
          },
          totalAmount: {
            type: Number,
          },
          status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'canceled'],
            default: 'pending',
          },
        },
      ],
      cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      wishlist: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User = mongoose.model('User', UserSchema);
module.exports = User;
