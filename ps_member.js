const mysql_con = require('./js/mysql_con.js');
var con = mysql_con.con;

function join_html(req, res, next){
    res.sendFile('join.html', {root: __dirname});
}

function login_html(req, res, next){
    res.sendFile('login.html', {root: __dirname});
}

function login(req, res, next){
    console.log(req.query.email);
    var email = req.query.email;
    var pw = req.query.pw;

    var q = `select * from member where email = "${email}"`
    con.query(q, function (err, result) {
        if (err) throw err;
        console.log(result);

        if(result[0] === undefined){
            res.send({
                condition: "fail",
                message: "존재하지 않은 유저입니다."
            });
        }
        else{
            if(result[0].password === pw){
                res.cookie("userEmail", email);
                res.cookie("username", result[0].name);
                res.send({
                    condition: "success",
                    message: "로그인되었습니다."
                });
            }
            else{
                res.send({
                    condition: "fail",
                    message: "비밀번호가 틀렸습니다."
                });
            }
        }
        console.log(`query 성공함`);
    });
}

function logout(req, res, next){
    res.cookie("userEmail", "");
    res.sendFile('index.html', {root: __dirname});
}

function join(req, res, next){
    var name = req.query.name;
    var email = req.query.email;
    var pw = req.query.pw;
    var phone = req.query.phone;

    var f = `select * from member where email = "${email}"`;
    con.query(f, function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result[0] === undefined){
            var q = `insert into member (name, email, password, phone) values("${name}", "${email}", "${pw}", "${phone}")`
            con.query(q, function (err, result) {
                if(err) throw err;
                console.log(result);
                res.send({
                    condition: "join",
                    message: "회원가입이 완료되었습니다."
                });
            }); 
        }
        else{
            res.send({
                condition: "fail",
                message: "이미 있는 유저입니다."
            });
        }
    });
}

exports.login = login;
exports.login_html = login_html;
exports.join = join;
exports.join_html = join_html;
exports.logout = logout;
