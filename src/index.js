//Import
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000
const cors = require('cors');
const route = require('./routes/index')
const db = require('./config/db/index')
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Cookie Config
app.use(cookieParser());

//Session Config
app.use(session({
  secret: 'minhtrung', // Replace with a strong secret key
  resave: true,
  saveUninitialized: true,
}));



// Connect DataBase
db.connect()


// Serve File Middleware
app.use(express.static(path.join(__dirname, 'assets')))

// Serve Javascript Files
app.use(express.static(path.join(__dirname, 'front_end')))

// Serve config
app.use(express.static(path.join(__dirname, 'config')))






// Parse Middleware (req.body)
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// Use Handlebars
app.engine('handlebars', handlebars.engine())

app.set('view engine','handlebars')

app.set('views', path.join(__dirname, 'resources/views'));


app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: 'OPTIONS,GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Router init
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




