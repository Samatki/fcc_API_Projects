var https = require('http');
var fs = require('fs');
var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

https.createServer(function(req, res) {
    
      if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }
    

    if (req.url == '/') {
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        fs.readFile('views/index.html', function(err, data) {
            if (err) throw err;
            res.end(data)
            console.log(req.url)
        })
        
    } else if (req.url.substr(0, 5) == '/API/') {
        var returnRes = {
            "unix": null,
            "natural": null
        };

        var enteredValue = decodeURI(req.url.substr(5));
        var dateVal = 1000 * enteredValue;
        var z = ((new Date(dateVal)))
            
        if (z == 'Invalid Date') {
            z = ((new Date(enteredValue)))
            if (z == 'Invalid Date') {} else {
                returnRes.unix = z.getTime() / 1000;
                returnRes.natural = Months[z.getMonth()] + ' ' + z.getDate() + ', ' + z.getFullYear();
            }
        } else {
            returnRes.unix = z.getTime() / 1000;
            returnRes.natural = Months[z.getMonth()] + ' ' + z.getDate() + ', ' + z.getFullYear();
        }

        console.log('!!!')
        res.end(JSON.stringify(returnRes))

    } else {
        fs.readFile(req.url.substr(1), function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(data)
            res.end(data)
            console.log(req.url)
        })
    }
}).listen(process.env.PORT || 8080)