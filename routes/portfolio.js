const { isLoggedIn } = require('../middleware');
const Portfolio = require('../models/Portfolio');
const catchAsync = require('../utils/catchAsync');
const ExpressErrors = require('../utils/expressError');
const router = require('express').Router();

router.post('/', isLoggedIn ,catchAsync(async(req, res) => {
    try{    
        const {assets} = req.body;
        const portfolio = new Portfolio({assets: assets});
        portfolio.creator = req.user._id;
        portfolio.totalValue = 0;
        for(var i = 0; i<assets.length ;++i)
            portfolio.totalValue += assets[i].value;
        res.send(portfolio);
    }catch(err){
        throw new ExpressError(err.message, 400);
    }
}));

module.exports = router;