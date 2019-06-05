const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    level :{type:Number},
    password: {type:String},
});

router.post('/clearLevel',function(req,res){
    var level = req.body.level;
    var password = req.body.password;

    loginmodel.findOne({level: level, password: password}, function(err,lev){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        if(!lev){
            return res.status(404).send();
        }

        return res.status(200).send();
    })
});