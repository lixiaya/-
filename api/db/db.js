const mysql = require('mysql')

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qwerty',
    port:3306,
    database:'gustbook',
    timezone: "08:00"
})
//连接状态
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });
// 向外导出
  module.exports=db
  
  
