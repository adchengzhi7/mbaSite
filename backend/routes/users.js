var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send("You're so cool");
});

router.post('/sqlTest', (req, res) => {
  var data = req.body;
  // var responseJson = JSON.stringify(data.response);
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
    connection.query('INSERT INTO user SET ?',data ,function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
  });
});

module.exports = router;

