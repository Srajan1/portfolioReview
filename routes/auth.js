const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError')
const {registerValidation} = require('../validation');
const {isLoggedIn} = require('../middleware');
router.post('/register', catchAsync(async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const {error} = registerValidation(req.body);
        if(error){ req.flash('error', error.details[0].message); res.redirect('/');}
        else {
            const user = new User({username: username, email: email});
            const savedUser = await User.register(user, password);
            req.login(savedUser, (err) => {
                if(err){req.flash('error', error); res.redirect('/');}
                req.flash('success', 'Welcome');
                console.log(newUser);
            })
            
        }
    }catch(err){
        throw new ExpressError(err.message, 400);
    }
}));

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login'}),async(req, res) => {
    req.flash('success', 'Welcome');
    res.redirect('/');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.flash('success', 'Logged out');
    res.redirect('/');
})

module.exports = router;