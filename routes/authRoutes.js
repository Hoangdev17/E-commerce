const express = require('express');
const { registerUser, loginUser, handleFirebase } = require('../controllers/authcontroller.js');
const passport = require('passport');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post("/google-login", handleFirebase);

module.exports = router;
