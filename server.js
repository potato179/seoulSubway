const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysqlconfig = require("./public/js/mysql_con.js");
const con = mysqlconfig.con;

const ps_users = require("./ps_users.js");
const ps_questions = require("./ps_questions.js");
const ps_notice = require("./ps_notice.js");
const ps_getstation = require("./ps_getstation.js")

const hostname = "127.0.0.1";
const port = "3000";

var urls = [
    {url: "/login", ps: ps_users.login},
    {url: "/login.html", ps: ps_users.login_html},
    {url: "/logout", ps: ps_users.logout},
    {url: "/join", ps: ps_users.join},
    {url: "/join.html", ps: ps_users.join_html},
    {url: "/get_questions", ps: ps_questions.get_questions},
    {url: "/view_question", ps: ps_questions.view_question},
    {url: "/write_question", ps: ps_questions.write_question},
    {url: "/writequestion.html", ps: ps_questions.write_question_page},
    {url: "/get_notice", ps: ps_notice.get_notice},
    {url: "/view_notice", ps: ps_notice.view_notice},
    {url: "/write_notice", ps: ps_notice.write_notice},
    {url: "/writenotice.html", ps: ps_notice.write_notice_page},
    {url: "/station.html", ps: ps_getstation.station_html},
    {url: "/getstationinfo", ps: ps_getstation.getstationinfo},
    {url: "/getStations", ps: ps_getstation.getStations},
    {url: "/arrivals.html", ps: ps_getstation.arrivals_html}
];

process.argv.forEach(function(item, index) {
    console.log(item, index);
    if(item == "--port") port = Number(process.argv[index + 1]);
});

app.use("/public", express.static("public"));

app.listen(port, hostname, () => {
    console.log(port, hostname);
});

app.get("/", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

app.get("/index.html", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

app.get("/train.html", function(req, res, next){
    res.sendfile("train.html", {root: __dirname});
});

app.get("/notice.html", function(req, res, next){
    res.sendfile("notice.html", {root: __dirname});
});

app.get("/community.html", function(req, res, next){
    res.sendfile("community.html", {root: __dirname});
});

urls.forEach(function(element, index){
    app.get(element.url, element.ps);
});