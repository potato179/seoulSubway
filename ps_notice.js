const mysqlconfig = require('./public/js/mysql_con.js');
var con = mysqlconfig.con;

function get_notice(req, res, next){
    var s = `select * from notice;`;
    con.query(s, function(err, result){
        if(err) throw err;
        res.send(result);
    });
}

function view_notice(req, res, next){
    console.log(`id: `, req.query.id);
    var s = `select * from notice where id = "${req.query.id}";`;
    con.query(s, function(err, result){
        if(err) throw err;
        if(result[0] == undefined){
            return res.send(`존재하지 않는 글입니다.`);
        }
        res.send(result[0]);
    });
}

function write_notice(req, res, next){
    var tit = req.query.title;
    var wtr = req.query.writer;
    var ct = req.query.content;
    var s = `insert into notice (title, writer, content) values("${tit}", "${wtr}", "${ct}");`;
    con.query(s, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "질문 등록을 완료하였습니다."
        });
    });
}

function write_notice_page(req, res, next){
    res.sendfile("writenotice.html", {root: __dirname});
}

exports.get_notice = get_notice;
exports.view_notice = view_notice;
exports.write_notice = write_notice;
exports.write_notice_page = write_notice_page;