var express = require('express');
var multer  = require('multer');
var fsX = require('fs-extra');

var upload = multer({ dest: './uploads/' });

var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.post('/get-file-size',  upload.single('file'), function(req,res){
  console.log('POST request recieved');
  res.json({"File Name:" : req.file.originalname, "File Size" : (Number(req.file.size)/1000).toFixed(2) + "KB"});
  fsX.emptydir('uploads',function(err){
      if (err) throw err;
      console.log('Directory Wiped');
  });    
});

app.listen(process.env.PORT || 8080);