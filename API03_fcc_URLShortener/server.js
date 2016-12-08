var mongo = require('mongodb').MongoClient;
var express = require('express');

var urlStringValidator = require('./api03_urlValidator.js');
var dbScript = require('./dbScript.js')


var app = express();
app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
})

app.get('/API/*',function(req,res){

    var urlToBeShortened = req.url.substr(5);
    if(urlStringValidator.uV(urlToBeShortened)){
        // RUN DATABASE SCRIPT //
        dbScript.dataBaseCheckerAndAdder(urlToBeShortened,function(err, result){
                        console.log(result);
                        res.json(result);
                    });
    //    res.json({URLSent: urlToBeShortened, shortURL: 'Blah blah blah' });
    }else{
        res.end('You sent an invalid URL string');
    }
})

app.get('/s/*',function(req,res){
    console.log('Parsing request received')
    console.log('Parsing URL: ' + req.url.substr(3))
        dbScript.shortenedURLRerouter(req.url.substr(3),function(err,result){
            if (result === false){
                res.send('You have an invalid shortened URL')
            } else {
            if(result.substr(0,4)!='http'||result.substr(0,3)!='ftp'){
               // Basic Address Fixing
               result = 'http://' + result;   
            }
               res.redirect(result.toString());
            }
        })
})

app.listen(process.env.PORT || 8080);