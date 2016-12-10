module.exports = {
    returnMostRecent : function(callback){
        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://xxxxx';
        
        mongo.connect(mongoDBURL,function(err,db){
        console.log('Connected to Database');
            if (err) throw err;
            db.collection('imageSearchRecord').find( { }, { "SearchTerm" : 1, "DateTime" : 1, "_id" : 0 }).toArray(function(err,items){
                if (err) { console.log(err)}
              db.close;
             console.log('History Accessed Successfully');
             callback(null,items);
            });
            
        });
    }
};
