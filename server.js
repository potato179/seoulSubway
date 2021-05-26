const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysqlconfig = require("./public/js/mysql_con.js");
const con = mysqlconfig.con;

const ps_users = require("./ps_member.js");
const ps_questions = require("./ps_questions");

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
    {url: "/writequestion.html", ps: ps_questions.write_question_page}
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

app.get("/station.html", function(req, res, next){
    res.sendfile("station.html", {root: __dirname});
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