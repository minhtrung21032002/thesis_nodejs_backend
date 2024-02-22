const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');


// Edit Steps
router.get('/edit/steps/:blog_id', blogController.blog_page_edit1)
router.get('/edit/steps/api/:blog_id/:step_id', blogController.blog_page_edit1_data)
router.patch('/edit/steps/:blog_id', blogController.blog_page_edit1_update_rearrange) // REARRANGE STEPS
router.post('/edit/steps/:blog_id/', blogController.blog_page_edit1_update_create) // CREATE INSERT STEP
router.patch('/edit/steps/:blog_id/:step_id', blogController.blog_page_edit1_update_steps) // UPDATE ALL STEPS INFORMATION
router.delete('/edit/steps/delete/:step_id/:blog_id', blogController.blog_page_edit1_delete) // DELETE STEP


// Edit Insert
router.get('/edit/steps/insert/api/:blog_id/', blogController.blog_page_edit1_insert_data)



// Edit Intro
router.get('/edit/intro/:blog_id', blogController.blog_page_edit2)
router.get('/edit/intro/api/:blog_id', blogController.blog_page_edit2_data)
router.post('/edit/intro/:blog_id', blogController.blog_page_edit2_update)


// Summary Comment
router.post('/comment/summary/:blog_id/:user_id', blogController.summary_comment)

// Step Comment
router.post('/comment/step/:step_id/:user_id', blogController.step_comment)

// Blog Page
router.get('/:blog_id', blogController.blog_page)
router.get('/api/:blog_id', blogController.blog_data)

//Conclusion
router.post('')

module.exports = router;