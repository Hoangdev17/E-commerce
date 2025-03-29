const admin = require('firebase-admin');

// Kiểm tra nếu Firebase chưa được khởi tạo
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('../config/e-commerce-55743-firebase-adminsdk-fbsvc-89378d9dd8.json')),
  });
} else {
  // Firebase đã được khởi tạo rồi
  console.log('Firebase Admin already initialized');
}

module.exports = admin;
