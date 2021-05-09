const http = require("http");
const mysql_con = require("./js/mysql_con.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();

const ps_member = require("./ps_member.js");

const hostname = '127.0.0.1';
var port = 5500;

var url_list = [
    {url: "/login", ps: ps_member.login},
    {url: "/login.html", ps: ps_member.login_html},
    {url: "/logout", ps: ps_member.logout},
    {url: "/join", ps: ps_member.join},
    {url: "/join.html", ps: ps_member.join_html},
];

process.argv.forEach(function(item, index){

    console.log("argv %d, %s", index, item);

    if( item == '--port'){
        port = Number(process.argv[index + 1]);
    }

});

var con = mysql_con.con;

app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/ 에서 서버 작동중`);
});


app.get('/', function(req, res, next){
    res.sendFile('lesson.html', {root: __dirname});
});

app.get('/lesson.html', function(req, res, next){
    res.sendFile('lesson.html', {root: __dirname});
});  

url_list.forEach(function(element, index){

    app.get(element.url, element.ps);

});