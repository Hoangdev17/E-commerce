// controllers/userController.js
import User from '../models/User.js';
import cloudinary from '../utils/cloudinary.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role ?? user.role;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const user = await User.delete({_id: req.params.id});
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    
    const imageUrl = req.file.path;

    await User.findByIdAndUpdate(req.user.id, { profilePicture: imageUrl });

    res.json({ success: true, url: imageUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Upload thất bại', error: err.message });
  }
};

