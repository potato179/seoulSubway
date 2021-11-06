const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysqlconfig = require("./public/js/mysql_con.js");
const con = mysqlconfig.con;

const ps_users = require("./ps_users.js");
const ps_questions = require("./ps_questions.js");
const ps_getstation = require("./ps_getstation.js");
const ps_pages = require("./ps_pages.js");

const hostname = "127.0.0.1";
const port = "3000";

var urls = [
    {url: "/login", ps: ps_users.login},
    {url: "/join", ps: ps_users.join},
    {url: "/logout", ps: ps_users.logout},
    {url: "/get_questions", ps: ps_questions.get_questions},
    {url: "/view_question", ps: ps_questions.view_question},
    {url: "/write_question", ps: ps_questions.write_question},
    {url: "/getstationinfo", ps: ps_getstation.getstationinfo},
    {url: "/getStations", ps: ps_getstation.getStations},
    {url: "/getStationByFrcode", ps: ps_getstation.getStationByFrcode},
    {url: "/index.html", ps: ps_pages.index_html},
    {url: "/join.html", ps: ps_pages.join_html},
    {url: "/login.html", ps: ps_pages.login_html},
    {url: "/writequestion.html", ps: ps_pages.write_question_page},
    {url: "/community.html", ps: ps_pages.community_html},
    {url: "/station.html", ps: ps_pages.station_html},
    {url: "/arrivals.html", ps: ps_pages.arrivals_html},
    {url: "/timetable.html", ps: ps_pages.timetable_html},
    {url: "/trainInfo.html", ps: ps_pages.trainInfo_html},
    {url: "/info.html", ps: ps_pages.info_html}
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

urls.forEach(function(element, index){
    app.get(element.url, element.ps);
});