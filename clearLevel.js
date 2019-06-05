const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const levelSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     level :{type:String},
//     password: {type:String},
// });

const levelmodel = require('./levelmodel');

router.post('/inpPass',function(req,res){
    var level = req.body.level;
    var password = req.body.password;
    var nextLevel = parseInt(level)+1;

    levelmodel.findOne({level: level, password: password}, function(err,lev){
        if(err){
            console.log(err);
            return res.status(500).send();
        }

        if(!lev){
            return res.status(404).send();
        }

        // return res.status(200).send();
        return res.redirect(`/page${nextLevel}.html`);
    })
});

router.post('/setPass',function(req,res){
    const newPass = new levelmodel({
        _id: new mongoose.Types.ObjectId(),
        level: req.body.level,
        password: req.body.password,
    });
    levelmodel.find({level:req.body.level})
    .exec()
    .then(level=>{
        if(level.length>0){
            res.send("Level Pass already exists").status(400);
        }
        else{
            newPass.save();
            res.send("New Level Password Set").status(201);
        }
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;