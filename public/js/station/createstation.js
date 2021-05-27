const http = require('http');
const mysql = require('mysql');
const express = require('express');
const util = require('util');

const app = express();
const hostname = '127.0.0.1';
var port = 3000;

process.argv.forEach(function(item, index){
    console.log("argv %d, %s", index, item);
    if( item == '--port'){
        port = Number(process.argv[index + 1]);
    }
});

const con = mysql.createConnection({
    host: "localhost",
    user: "happy",
    password: "1234",
    database: "seoul"
});

console.log(`로그인 성공`);
con.connect(function(err) {
    if (err) throw err;
    console.log(`연결 성공`);
});

app.use('/public', express.static('public'));
app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/ 에서 서버 작동중`);
});

app.get('/', function(req, res, next){
    res.sendFile('createstation.html', {root: __dirname});
});

app.get('/createstation.html', function(req, res, next){
    res.sendFile('createstation.html', {root: __dirname});
});           

/*
    line 
    id 
    name
    foriegn 
    prev
    next
     doors
    crossable
    rapid 
    restroom
    company
    address
    contact
    opendate
    nameorigin
*/

app.get("/createstation", function(req, res, next){
    var line = req.query.line;
    var id = req.query.id;
    var name = req.query.name;
    var foriegn = req.query.foriegn;
    var transfer = req.query.transfer;
    var prev = req.query.prev;
    var next = req.query.next;
    var doors = req.query.doors;
    var crossable = req.query.crossable;
    var rapid = req.query.rapid;
    var restroom = req.query.restroom;
    var company = req.query.company;
    var address = req.query.address;
    var contact = req.query.contact;
    var opendate = req.query.opendate;
    var nameorigin = req.query.nameorigin;

    var s = `insert into stations (line, id, name, foriegn, transfer, prev, next, doors, crossable, rapid, restroom, company, address, contact, opendate, nameorigin) values("${line}", "${id}", "${name}", "${foriegn}", "${transfer}", "${prev}", "${next}", "${doors}", "${crossable}", "${rapid}", "${restroom}", "${company}", "${address}", "${contact}", "${opendate}", "${nameorigin}");`;
    con.query(s, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "등록 성공."
        });
    });
});