const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const loginmodel = require('./loginmodel');

router.get('/',function(req,res){
    res.send("users home").status(200);
});

router.post('/',function(req,res){
   // console.log(req.body);
    //res.json(req.body).status(200);
    const newlogin = new loginmodel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password
    });
    loginmodel.find({name:req.body.name})
    .exec()
    .then(name=>{
        if(name.length>0){
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