const MongoClient = require('mongodb').MongoClient

process.on('uncaughtException', function (err) {
  console.log(err);
});

// Connect URL
const url = 'mongodb://127.0.0.1:27017/'

// Connect to MongoDB
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log("123");
        return console.log(err)
    }

    // Specify the database you want to access
    const db = client.db('testdb')
    console.log(`MongoDB Connected: ${url}`)
})

console.log("waiting for connection......")