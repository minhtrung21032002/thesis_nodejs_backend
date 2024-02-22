const express = require('express');
const router = express.Router();
const mainController = require('../controllers/MainController');


// Main Page
router.get('/api', mainController.main_page_data)

router.get('/', mainController.main_page)



module.exports = router;