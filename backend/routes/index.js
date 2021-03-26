let express = require('express');
let router = express.Router();
let mysql = require('mysql');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* mysql連線測試 */
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({ // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: process.env["MYSQL_HOST"], // 主機名稱
    user: process.env["MYSQL_USER"], // 用戶名稱 
    password: process.env["MYSQL_PASS"], // 資料庫密碼
    database: process.env["MYSQL_DATABASE"] // 資料庫名稱
  });
  connectionPool.getConnection((err, connection) => { //建立一個連線若錯誤回傳err
    if (err) {
      res.send(err);
      console.log('連線失敗！');
    } else {
      res.send('連線成功！');
      console.log(connection);
    }
  });
});
module.exports = router;
