import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


 export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ["Đã giao", "Hoàn tất"] } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      userCount,
      productCount,
      orderCount,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê", error });
  }
};
