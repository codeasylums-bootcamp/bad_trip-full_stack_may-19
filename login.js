const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const loginmodel = require('./loginmodel');




router.get('/',function(req,res){
    res.send("users home").status(200);
});




router.post('/existingUserLogin',function(req,res){
    var email  = req.body.email;
    var password = req.body.password;

    loginmodel.findOne({email: email, password: password}, function(err,user){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        if(!user){
            return res.status(302).redirect('/index.html');    
            // return res.status(404).send();
        }

        // res.render('/login');
        return res.redirect('/page1.html');
        
    })
});

router.post('/register',function(req,res){
   // console.log(req.body);
    //res.json(req.body).status(200);
    const newlogin = new loginmodel({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    loginmodel.find({email:req.body.email})
    .exec()
    .then(email=>{
        if(email.length>0){
            res.send("account already exists").status(400);
        }
        else{
            newlogin.save();
            res.send("account created").status(201);
        }
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;
