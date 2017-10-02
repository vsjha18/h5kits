var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/mydb';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  var cursor = db.collection('employee').find( );
  cursor.toArray(function(err, doc) {
    if (doc.length) {
        console.log("there is data");
        console.log(doc)
    } else {
        console.log("no data")
    }

    db.close()
  });
});
