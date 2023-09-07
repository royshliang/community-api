// 1. import required modules
const mysql2 = require('mysql2/promise');

// --- option 1 - creating connection pooling
const dbConnection = mysql2.createPool({
    host: "sql12.freemysqlhosting.net",
    user: "sql12643795",
    password: "y7UDUhual4",
    database: "sql12643795",
    multipleStatements: true,
    waitForConnections: true,    
})

// --- option 2 - create a connection object
// 2. create an connection object to datase
// const dbConnection = mysql.createConnection({
//     host: "103.3.173.137",
//     user: "root",
//     password: "returntoRL!",
//     database: "returnlegacy82",
// });
// // 3. connect to database
// dbConnection.connect((err) => {
//     if(err) throw err;
//     console.log("db connection established")
// });

module.exports = dbConnection; 