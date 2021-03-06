const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged in');
        return res.redirect('/user/login');
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn;