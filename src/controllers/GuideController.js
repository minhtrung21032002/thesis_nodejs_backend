const path = require('path');
const Guide = require('../models/guide');
const User = require('../models/user');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const Badge = require('../models/badge')
const Step = require('../models/step');
const mongoose = require('mongoose');
class GuildController{


    // [GET] /guide
    guide(req,res){
        
    
}
    
    // [GET] /guide
    guide_page(req,res){
        
        res.render('guides')
    

    }
    // [GET] /guide/api
    async guide_data(req,res){
        const data = await Guide.find()

    
        res.json(data)

    }
   
    new_page(req,res){

        res.render('') // view new_page
        // in new_page, has a form that will submit to 
        // guide/new_page/introduction/::slug

        // call the url new_page/introduction//::slug with json
    }
    /*
    new_page/introduction/::slug{
        res.json()
    }


        tra ve trang introduction with json = name
        co nut bam toi trang new_page/detail/::slug
    }
    */

    /*
    new_page/detail/::slug(guide_id)
    */

   

    //new_page/introduction/::slug(guide_id)


    async guide_create(req,res){
        const blogId = "65d70134118d62ab8dc0bf0e"
        const guide = await Guide.findOne({ blog_id: blogId });
        // Query to find the blog by ID and populate the 'steps' field
        const blog = await Blog.findById(blogId, '-user_id');

        const blog_information = await Blog.findById(blogId, '-user_id -steps -summary_comments');

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Extract information from the populated 'steps' field
        const stepsData = await Promise.all(blog.steps.map(async (step) => {
            // Query the 'steps' collection for each step ID to get additional information
            const detailedStep = await Step.findById(step._id);

            if (detailedStep) {
                // Extract the information you want from each detailed step
                return {
                    stepId: detailedStep._id,
                    step_number: detailedStep.step_number,
                    step_imgs: detailedStep.imgs,
                    step_content: detailedStep.step_content,

                    // Add other fields you want from each detailed step
                };
            }

            return null; // Handle the case where detailed step is not found
        }));
        const sortedStepsData = stepsData.sort((a, b) => a.step_number - b.step_number);
        // Query the 'steps' collection for the primary step using stepId

        // Construct the response JSON
        const responseData = {
            guide_information: guide,
            blog_information: blog_information, // Include blog information
            steps: sortedStepsData, // Remove null entries
        };
        console.log('reach guide create data')
        res.json(responseData);
    }
    // POST /guild/guide_store
    guide_store(req,res,next){
        console.log('image uploaded')
        res.json(req.body)
    }




}


module.exports = new GuildController