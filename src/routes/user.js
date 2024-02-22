const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


// About Page
router.get('/about', userController.about_page)
router.get('/about/api/:user_id', userController.about_data)

// Reputation Page
router.get('/reputation', userController.reputation_page)
router.get('/reputation/api/:user_id', userController.reputation_data)


module.exports = router;