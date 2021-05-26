const mysqlconfig = require('./public/js/mysql_con.js');
var con = mysqlconfig.con;

function get_questions(req, res, next){
    var s = `select * from questions`;
    con.query(s, function(err, result){
        if(err) throw err;
        res.send(result);
    });
}

function view_question(req, res, next){
    console.log(`id: `, req.query.id);
    var s = `select * from questions where id = "${req.query.id}";`;
    con.query(s, function(err, result){
        if(err) throw err;
        if(result[0] == undefined){
            return res.send(`존재하지 않는 질문입니다.`);
        }
        res.send(result[0]);
    });
}

function write_question(req, res, next){
    var tit = req.query.title;
    var wtr = req.query.writer;
    var ct = req.query.content;
    var ca = req.query.category;
    var s = `insert into questions (title, writer, content, category) values("${tit}", "${wtr}", "${ct}", "${ca}");`;
    con.query(s, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "질문 등록을 완료하였습니다."
        });
    });
}

function write_question_page(req, res, next){
    res.sendfile("writequestion.html", {root: __dirname});
}

exports.get_questions = get_questions;
exports.view_question = view_question;
exports.write_question = write_question;
exports.write_question_page = write_question_page;