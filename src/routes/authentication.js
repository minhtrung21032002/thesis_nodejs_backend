const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


//Login
router.get('/login', authController.normalLogin)
router.post('/login', authController.normalLoginProcess)


//Register
router.get('/register', authController.normalRegister)
router.post('/register', authController.normalRegisterProcess)



module.exports = router;