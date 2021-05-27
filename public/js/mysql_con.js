const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "happy",
    password: "1234",
    database: "seoul"
});

con.connect(function(err) {
    if (err) throw err;
});

exports.con = con;