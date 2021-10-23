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
    var title = req.query.title;
    var writer = req.query.writer;
    var content = req.query.content;
    var category = req.query.category;
    con.query(`insert into questions (title, writer, content, category, comments) values("${title}", "${writer}", "${content}", "${category}", "");`, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "질문 등록을 완료하였습니다."
        });
    });
}

exports.get_questions = get_questions;
exports.view_question = view_question;
exports.write_question = write_question;