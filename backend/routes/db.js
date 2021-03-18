

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '305009zhI',
  database: 'mba'
})

connection.connect()
const gets =() =>{
    connection.query(
        `SELECT *FROM user`, function (err, rows, fields) {
            if (err) throw err
            
            console.log('The solution is: ', rows[0].email)
        })
    }
// connection.end()
exports.gets=gets;