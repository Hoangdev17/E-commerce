const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Giải mã nội dung JSON từ biến môi trường (base64)
const serviceAccountJSON = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
);

// Khởi tạo Firebase Admin nếu chưa được khởi tạo
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJSON),
  });
} else {
  console.log('Firebase Admin already initialized');
}

module.exports = admin;

