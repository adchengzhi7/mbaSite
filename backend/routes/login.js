let express = require('express');
let router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.post('/', function(req, res, next) {
    var data = req.body;
    const connectionPool = mysql.createPool({ // 建立一個連線池
      connectionLimit: 10, // 限制池子連線人數
      host: process.env["MYSQL_HOST"], // 主機名稱
      user: process.env["MYSQL_USER"], // 用戶名稱 
      password: process.env["MYSQL_PASS"], // 資料庫密碼
      database: process.env["MYSQL_DATABASE"] // 資料庫名稱
    });
    connectionPool.getConnection((err, connection) => { //建立一個連線若錯誤回傳err
      if (err) throw err;
      console.log("Connected!");
      connection.query('select * from `users` where users_accId =? AND users_pass = ?',[data.user,data.password] ,function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            res.send(result)
        }else{
            res.send(err)
        }

        
      });
    });
});

/* mysql連線測試 */

module.exports = router;