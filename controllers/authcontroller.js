const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const admin = require('../config/firebaseService');

// Đăng ký người dùng mới
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const handleFirebase = async (req, res) => {
  const { firebaseToken } = req.body;

  // Kiểm tra nếu firebaseToken có trong body
  if (!firebaseToken) {
    return res.status(400).send('Firebase token is required');
  }

  try {
    // Xác thực token Firebase
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const uid = decodedToken.uid;

    // Kiểm tra nếu người dùng đã tồn tại trong DB và tạo mới nếu chưa
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Nếu người dùng chưa có, tạo mới
      user = await User.create({
        firebaseUid: uid,
        email: decodedToken.email,   
        name: decodedToken.name 
      });
    }

    // Tạo JWT cho người dùng, lưu ý sử dụng secret key từ biến môi trường
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    // Ghi log chi tiết lỗi
    console.error('Lỗi xác thực token Firebase:', error);

    // Kiểm tra lỗi Firebase và phản hồi thích hợp
    if (error.code === 'auth/argument-error') {
      return res.status(400).send('Invalid Firebase token');
    }

    res.status(401).send('Unauthorized');
  }
};


module.exports = { registerUser, loginUser,handleFirebase };
