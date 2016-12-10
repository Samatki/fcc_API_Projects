var searchHistoryLogger = require('./searchHistory.js');
var imageSearcher = require('./imageSearcher.js');

var express = require('express');
var request = require('request');

var app = express();
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/API/hSearch/',function(req,res){
    searchHistoryLogger.returnMostRecent(function(err,returnedList){
        if (err) throw err;
        res.json(returnedList);
    });
});

//app.get('/API/iSearch/*',function(req,res){
  //  imageSearcher.imgurSearcher(req.url.substr(13),function(err,result){
 //       if(err) throw err;
//        res.json(result);
 //   })
//})

app.get('/API/iSearch/*',function(req,res){
    imageSearcher.imgurSearcher(req.url.substr(13),function(err,result){
          if(err) throw err;
          var offsetValue = 1;
          if(result.query){
          var offsetValue = (result.query.substr(0,7)== 'offset=')? Math.max(parseInt(result.query.substr(7)),1) : '1';              
          }

          var searchTerm = result.pathname;

          var imgurAPIOptions = {
            headers: {
                'Authorization': 'Client-ID xxxxxxxxx'
            },
            json: true,
            url: 'https://api.imgur.com/3/gallery/search/time/'+offsetValue+'/?q='+searchTerm,
            method: 'GET'
        };
        
        request.get(imgurAPIOptions,function(err, rev, body){
            if(err){console.log(err)}
          //  console.log(body.data.length);
            var data = body.data.map(function(d){
                return { imageURL: d.link, snippet: d.title, type: d.type, topic: d.topic};
            });

            console.log('GATHERED IMGUR DATA');
                
            res.send(data);

        });
    });
});


app.listen(process.env.PORT || 8080);
