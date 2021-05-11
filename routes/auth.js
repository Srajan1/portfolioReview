const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User')
const {registerValidation} = require('../validation');
router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const {error} = registerValidation(req.body);
        if(error) return res.status(401).send(error.details[0].message);
        else {
            const user = new User({username: username, email: email});
            const savedUser = await User.register(user, password);
            res.send(savedUser);
        }
    }catch(err){
        res.send(err.message);
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login'}),async(req, res) => {
    console.log('Logged in');
    res.send('Logged in')
});

module.exports = router;