function join_html(req, res, next){
    res.sendFile('join.html', {root: __dirname});
}

function login_html(req, res, next){
    res.sendFile('login.html', {root: __dirname});
}

function write_question_page(req, res, next){
    res.sendfile("writequestion.html", {root: __dirname});
}

function write_notice_page(req, res, next){
    res.sendfile("writenotice.html", {root: __dirname});
}

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

function arrivals_html(req, res, next){
    res.sendFile("arrivals.html", {root: __dirname});
}

function trainInfo_html(req, res, next){
    res.sendFile("trainInfo.html", {root: __dirname});
}

function info_html(req, res, next){
    res.sendfile("info.html", {root: __dirname});
}

exports.join_html = join_html;
exports.login_html = login_html;
exports.write_question_page = write_question_page;
exports.write_notice_page = write_notice_page;
exports.station_html = station_html;
exports.arrivals_html = arrivals_html;
exports.trainInfo_html = trainInfo_html;
exports.info_html = info_html;