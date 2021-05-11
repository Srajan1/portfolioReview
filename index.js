const express = require('express');
const app = express();

// CONNECTING TO DATABASE
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(
process.env.DB_CONNECT, 
{useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true},
 () => { console.log('Connected to db');})

// JSON PARSING 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PASSPORT AUTHENTICATION SETUP
const session = require('express-session');
const sessionConfig = {
    secret: 'Needabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, //Stops third party to access cookies
      expires: Date.now() + 1000 * 24 * 60 * 60 * 7,
      maxAge: 1000 * 24 * 60 * 60 * 7
    }
  };
app.use(session(sessionConfig));
const User = require('./models/User');
const passport = require('passport');
const localStrategy = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()) ); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// SETTING UP VIEWS
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));





// HOME
app.get('/', (req, res) => {
    res.send('explore');
})

// IMPORTING ROUTES
const authRouter = require('./routes/auth');
app.use('/user', authRouter);



app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(3000, (req, res) => {
    console.log('Server started');
})