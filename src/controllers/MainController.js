const User = require('../models/user');

class MainController{


    // [GET] /api
    async main_page_data(req,res){
        const session_userId_query = req.session.user_id;
        const loginUserInformation = await User.findById(session_userId_query).lean();

        const responseData = {
            login_user: loginUserInformation,
        };
        console.log('response data for main_page')
        console.log(responseData)
        res.json(responseData);
    }

    // [GET] /main
    main_page(req,res){
        res.render('home', { layout: false  });
    }

}

module.exports = new MainController