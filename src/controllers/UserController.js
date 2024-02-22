const path = require('path');
const User = require('../models/user');
const Guide = require('../models/guide');
const Badge = require('../models/badge')
const Blog = require('../models/blog')
class UserController{


    async about_page(req, res) {
      
}
    

    // [GET] /about/api/:user_id
    async about_data(req, res) {
        try {
            const userId = req.params.user_id;

            // Fetch user information based on userId
            const user = await User.findOne({ _id: userId });
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Fetch blogs associated with the user_id
            const list_guides = await Guide.find({ user_id: userId })
            .select('_id guide_title img_url');
        
            const list_events = await Blog.find({ user_id: userId })
            .select('number_access number_of_likes number_of_completed');

        // Initialize variables to store the sum of each field
        let total_number_access = 0;
        let total_number_of_likes = 0;
        let total_number_of_completed = 0;

        // Loop through the list of events and update the sums
        list_events.forEach(event => {
            total_number_access += event.number_access || 0;
            total_number_of_likes += event.number_of_likes || 0;
            total_number_of_completed += event.number_of_completed || 0;
        });
        const list_badges_id = await User.findOne({ _id: userId }).select('badges');

        // Extract the badge IDs from the user document
        const badgeIds = list_badges_id.badges;
        
        // Use the find method to retrieve the corresponding badges
        const list_badges = await Badge.find({ _id: { $in: badgeIds } });
        
            // Extract relevant information from the user document
            const user_information = {
                user_id: user._id,
                points: user.points,
                member_since: user.member_since,
                user_name: user.user_name,
                user_img: user.user_img
                // Add more fields as needed
            };

            // Return the data as JSON
            res.json({ user_information, list_guides,   list_badges,
                total_number_access,
                total_number_of_likes,
                total_number_of_completed });
        } catch (error) {
            console.error('An error occurred while fetching user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    


    }

    // [GET] /reputation
    reputation_page(req, res) {
        res.render('reputation'); 
    }

    // [GET] /reputation/api/:user_id
    async reputation_data(req, res) {
        try {
            const userId = req.params.user_id;

            // Fetch user information based on userId

            // Fetch blogs associated with the user_id
            

            const list_events = await Blog.find({ user_id: userId })
                .select('number_access number_of_likes number_of_completed');

            // Initialize variables to store the sum of each field
            let total_number_access = 0;
            let total_number_of_likes = 0;
            let total_number_of_completed = 0;

            // Loop through the list of events and update the sums
            list_events.forEach(event => {
                total_number_access += event.number_access || 0;
                total_number_of_likes += event.number_of_likes || 0;
                total_number_of_completed += event.number_of_completed || 0;
            });
            const list_badges_id = await User.findOne({ _id: userId }).select('badges');

            // Extract the badge IDs from the user document
            const badgeIds = list_badges_id.badges;
            
            // Use the find method to retrieve the corresponding badges
            const list_badges = await Badge.find({ _id: { $in: badgeIds } });
            
            // Now, list_badges contains an array of Badge documents associated with the user
            

            // Return the data as JSON
            res.json({
                list_badges,
                total_number_access,
                total_number_of_likes,
                total_number_of_completed
            });
        } catch (error) {
            console.error('An error occurred while fetching user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    
    }
}


module.exports = new UserController