// 실행 시 이 아래 코드 수정 후 파일의 이름을 "mysql_con.js"로 변경해주세요.
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "happy",
    password: "1234",
    database: "seoul"
});

con.connect(function(err) {
    if (err) throw err;
});

exports.con = con;
