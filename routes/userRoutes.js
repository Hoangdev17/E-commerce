// routes/userRoutes.js
const express = require('express') ;
const { getAllUsers, updateUser, deleteUser, getUser, uploadAvatar } = require ('../controllers/userController.js');
const authenticate = require ('../middleware/authMiddleware.js');
const authorizeAdmin = require ('../middleware/roleMiddleware.js');
const upload = require('../middleware/upload.js');

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.put('/:id', authenticate, authorizeAdmin, updateUser);
router.delete('/:id', authenticate, authorizeAdmin, deleteUser);
router.get('/profile', authenticate, getUser);

router.post('/upload-avatar', upload.single('avatar'),authenticate, uploadAvatar);

module.exports = router;