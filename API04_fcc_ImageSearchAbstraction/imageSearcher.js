module.exports = {

    imgurSearcher: function(parsedURL, callback) {
   
        var urlsorter = require('url');
        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://xxxxxxx';

        var timeOfRequest = (new Date()).toISOString();

        var requestObj = urlsorter.parse(parsedURL);
        console.log(requestObj);
        var newSearch = {
            "DateTime": timeOfRequest,
            "SearchTerm": decodeURI(requestObj.pathname)
        };

        // UPDATE LOGGER DATABASE //

        mongo.connect(mongoDBURL, function(err, db) {
            if (err) throw err;
            
            db.collection('imageSearchRecord').find().toArray(function(err,items){
                if(err) throw err;

                console.log(items.length);

                if (items.length > 10){
                
                for (var i = 0; i<items.length - 9; i++ ){
                    db.collection('imageSearchRecord').remove({DateTime : items[i].DateTime})
                }
                    
                    
                }
            })
            
            
            
            db.collection('imageSearchRecord').insertOne(newSearch, function(err, record) {
                if (err) throw err;
                console.log("Search history updated successfully");
                db.close();
            });
        });

        callback(null, requestObj);


    }


};
