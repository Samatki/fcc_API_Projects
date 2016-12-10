module.exports = {

    dataBaseCheckerAndAdder: function(pURL, callback) {
        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://xxx;


        mongo.connect(mongoDBURL, function(err, db) {
            if (err) {
                console.log('Problem connecting to Database')
                throw err;
            };

            console.log('Connected to Database');

            db.collection('urlList').count({
                "longURL": pURL.toString()
            }, function(err, count) {
                console.log(count);
                if (err) throw err;
                if (count > 0) {
                    console.log('count > 1, Using Current')
                    console.log(pURL.toString())
                    db.collection('urlList').findOne({
                        "longURL": pURL.toString()
                    }, {
                       // "entry": 0, Not sure why this doesn't work
                        "longURL": 1,
                        "shortURL": 1,
                        "_id": 0
                        
                    }, function(err, cursor) {
                        if (err){console.log(err)}
                        db.close();
                        callback(null, JSON.stringify(cursor));
                    });

                } else {
                    console.log('count = 0, Adding');


                    db.collection('urlList').aggregate([{
                        $match: {}
                    }, {
                        $group: {
                            _id: 'maxval' 
                                ,
                            maxval: {
                                $max: '$entry'
                            }
                        }
                    }], function(err, results) {

                        var maxValue = parseInt(results[0].maxval);


                        var currWorkingData = {
                            "entry": (maxValue + 1).toString(),
                            "longURL": pURL.toString(),
                            "shortURL": 'https://fcc-api3.herokuapp.com/s/' + (maxValue + 1).toString()
                        };

                        db.collection('urlList').insertOne(currWorkingData, function(err, record) {
                            console.log('Entry added! - ' + pURL.toString());
                            db.close();
                            console.log(record[0]);
                            callback(null, JSON.stringify(currWorkingData, ['longURL', 'shortURL']));

                        });

                    })
                }

            })

        })
    },


    shortenedURLRerouter: function(sURL, callback) {
        var mongo = require('mongodb').MongoClient;
        var mongoDBURL = 'mongodb://xxxx';
        
        mongo.connect(mongoDBURL, function(err, db) {
            if (err) {
                console.log('Problem connecting to Database')
                throw err;
            };

            console.log('Connected to Database');
            console.log(sURL);
            db.collection('urlList').findOne({
                "entry" : sURL
            }, function(err, cursor) {
             if (err){console.log(err)}
              console.log('next');

              if(cursor){ 
                  db.close()
                  callback(null,cursor.longURL)
                  
              } else {
                  db.close()
                  callback(null,false)
              }

        
         }
        
        );
    });
    }
};
