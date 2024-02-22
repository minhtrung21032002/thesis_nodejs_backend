const authRouter = require('./authentication.js')
const guideRouter = require('./guide.js')
const userRouter = require('./user.js')
const mainRouter = require('./main.js')
const path = require('path');

// index-page
function route(app){

    // Landing Page
    app.get('/', (req, res) => {
        res.render('landing', { layout: false });
    });

    // Main Page
    app.use('/main', mainRouter)

    // Login Page
    app.use('/auth', authRouter)

    // Guide Page
    app.use('/guide', guideRouter)

    // User Page
    app.use('/user', userRouter)

}
module.exports = route