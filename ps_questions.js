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
    var s = `select * from users where id = "${req.query.id}";`;
    con.query(s, function(err, result){
        if(err) throw err;
        if(result[0] == undefined){
            return res.send(`존재하지 않는 질문입니다.`);
        }
        res.send(result[0]);
    });
}

function modify_question(req, res, next){
    var ct = req.query.content;
    var id = req.query.id;
    var s = `update question set content = "${ct} where id = "${id}`;
    con.query(s, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "질문 수정을 완료하였습니다."
        });
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

function delete_question(req, res, next){
    var id = req.query.id;
    var s = `delete from question where id = "${id}`;
    con.query(s, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "삭제됨",
            message: "질문 삭제를 완료하였습니다."
        });
    });
}

function write_comment(req, res, next){
    var com = req.query.comments;
    var id = req.query.id;
    var email = req.query.email;
    var username = req.query.username;
    var s = `select comment from questions where id = "${id}";`;
    con.query(s, function(err, result){
        if(err) throw err;
        //json 파싱할 것.
    });
}

function like_question(req, res, next){
    var email = req.query.email;
    var id = req.query.id;
    console.log(id);
    var s = `select likes from questions where id = "${id}";`;
    con.query(s, function(err, result){
        if(err) throw err;
        //이것도 json으로 ㄱ
    });
}

function write_question_page(req, res, next){
    res.sendfile("write_question.html", {root: __dirname});
}

exports.get_questions = get_questions;
exports.view_question = view_question;
exports.modify_question = modify_question;
exports.write_question = write_question;
exports.delete_question = delete_question;
exports.write_comment = write_comment;
exports.like_question = like_question;
exports.write_question_page = write_question_page;