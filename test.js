var https = require('https');

var options = {
  hostname: 'api.imgur.com',
  path: '/3/gallery/search/time/1/?q=cat',
  headers: {'Authorization': 'Client-ID dabfb7dbf094535'},
  method: 'GET'
};


// REQUEST STARTS HERE //

var req = https.request(options, function(res) {
 
  var block = '';
  
  res.on('data', function(d) {
    block += d;
  });
  
 res.on('end',function(d){
      console.log(block);
  });
  
  
});

req.on('error', function(e) {
  console.error(e);
});

req.end(function(){
  console.log('bkabhg')
});

// REQUEST ENDS HERE //

console.log('aaaaa')
