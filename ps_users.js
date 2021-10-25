const mysqlconfig = require('./public/js/mysql_con.js');
var con = mysqlconfig.con;

const crypto = require("crypto");

function login(req, res, next){
    var shasum = crypto.createHash("sha256");
    var email = req.query.email;
    shasum.update(req.query.pw);
    var pw = shasum.digest("hex");

    con.query(`select * from users where email = "${email}"`, function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result[0] === undefined){
            res.send({
                condition: "fail",
                message: "존재하지 않는 이메일입니다."
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
                    message: "비밀번호가 불일치합니다."
                });
            }
        }
    });
}

function logout(req, res, next){
    res.cookie("userEmail", "");
    res.sendFile('index.html', {root: __dirname});
}

function join(req, res, next){
    var name = req.query.name;
    var email = req.query.email;
    var shasum = crypto.createHash("sha256");
    shasum.update(req.query.pw)
    var pw = shasum.digest("hex")
    
    con.query(`select * from users where email = "${email}"`, function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result[0] === undefined){
            con.query(`insert into users (name, email, password) values("${name}", "${email}", "${pw}")`, function (err, result) {
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
exports.join = join;
exports.logout = logout;
