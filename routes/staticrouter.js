const express = require("express");
const URL = require("../models/url");

const router = express.Router();


router.get('/',async(req,res)=>{
    const allurls = await URL.find({})   // to show all shortids
    return res.render('home',{
        urls:allurls,
    });
});


module.exports = router;