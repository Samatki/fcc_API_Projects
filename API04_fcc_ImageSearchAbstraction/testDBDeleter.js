        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://admin:adminpassword@ds127878.mlab.com:27878/image_search_db';

        mongo.connect(mongoDBURL, function(err, db) {
            if (err) throw err;
 
            var databaseCol = db.collection('imageSearchRecord');
            
            db.collection('imageSearchRecord').find().toArray(function(err,items){

                console.log(items.length);

                if (items.length > 5){
                
                for (var i = 0; i<items.length - 6; i++ ){
                    db.collection('imageSearchRecord').remove({DateTime : items[i].DateTime})
                }
                    
                    
                }
            })

            });
 