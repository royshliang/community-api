const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/testdb";
const client = new MongoClient(uri);

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected successfully to server");

  // perform CRUD operations here

  client.close();
});

const db = null;
module.exports = db