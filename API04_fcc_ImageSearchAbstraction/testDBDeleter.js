        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://xxxx';

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
 
