require('dotenv').config(); // Load biến môi trường

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'default_cloud_name',
  api_key: process.env.API_KEY_CLOUDINARY || 'default_api_key',
  api_secret: process.env.API_SECRET_CLOUDINARY || 'default_api_secret',
});

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY ? '****' : 'MISSING',
});

module.exports = cloudinary;
