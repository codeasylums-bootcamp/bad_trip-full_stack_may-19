const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs');

const app = express();
const port = 6969;

mongoose.connect("mongodb+srv://priyesh:hiiatlas@cluster0-qdiis.mongodb.net/test?retryWrites=true&w=majority",function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('atlas connected');
    }
});



const login = require('./login');
const clearLevel = require('./clearLevel');



app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use('*',function(req,res,next){
    res.set('Access-Control-Allow-origin','*');
    res.set('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.get('/*', function(req,res) {
    data= fs.readFile('/home/priyadarshan/Desktop/CODES/CodeAsylums/Hackathon2/' + req.url,   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);});
});

//app.use('/reg',rege);
app.use('/login',login);
app.use('/clearLevel',clearLevel);
//app.use('/order',orders)




 app.listen(port,function(){
     console.log(`Server listening on ${port}`);
 });
 