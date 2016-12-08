var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/API/',function(req,res){
var usrOS = req.headers['user-agent'];
var usrLang = req.headers['accept-language'];
var usrIP = req.headers['x-forwarded-for'];

res.json({ipaddress : usrIP, language : usrLang, software : usrOS})
console.log(usrOS + '  , ' + usrLang + '  , '+ usrIP)

})


app.listen(process.env.PORT || 8080)