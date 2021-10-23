function index_html(req, res, next){
    res.sendFile('index.html', {root: __dirname});
}

function join_html(req, res, next){
    res.sendFile('join.html', {root: __dirname});
}

function login_html(req, res, next){
    res.sendFile('login.html', {root: __dirname});
}

function write_question_page(req, res, next){
    res.sendfile("writequestion.html", {root: __dirname});
}

function community_html(req, res, next){
    res.sendfile("community.html", {root: __dirname});
}

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

function arrivals_html(req, res, next){
    res.sendFile("arrivals.html", {root: __dirname});
}

function timetable_html(req, res, next){
    res.sendFile("timetable.html", {root: __dirname});
}

function trainInfo_html(req, res, next){
    res.sendFile("trainInfo.html", {root: __dirname});
}

function info_html(req, res, next){
    res.sendfile("info.html", {root: __dirname});
}

exports.index_html = index_html;
exports.join_html = join_html;
exports.login_html = login_html;
exports.write_question_page = write_question_page;
exports.community_html = community_html;
exports.station_html = station_html;
exports.arrivals_html = arrivals_html;
exports.timetable_html = timetable_html;
exports.trainInfo_html = trainInfo_html;
exports.info_html = info_html;