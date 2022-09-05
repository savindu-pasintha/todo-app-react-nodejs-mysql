const mysql = require('mysql')
const DBHostType = {
  local: {
    type: 'localhost',
    DBName: 'jiraboard',
    user: 'root',
    password: '',
    port: 3306,
    url: 'https://www.db4free.net/phpMyAdmin/',
  },
}

const MySqlQueryExecute = (SQL_Query_as_STRING) => {
  return new Promise((resolve, reject) => {
    const mysql_connection = mysql.createConnection({
      host: DBHostType.local,
      port: DBHostType.local.port,
      user: DBHostType.local.user,
      password: DBHostType.local.password,
      database: DBHostType.local.DBName,
    })
    mysql_connection.connect((err) => {
      if (err) {
        // console.log({ Connecting_Id: err.stack });//return;
        reject(err)
        mysql_connection.end()
      } else {
        //console.log({ Connected_Thread_Id: mysql_connection.threadId });
        mysql_connection.query(SQL_Query_as_STRING, (err, result) => {
          if (err) {
            //console.log({ Error: err });//return err;
            reject(err)
            mysql_connection.end()
          } else {
            //console.log({ Result: result }); //return { 'result': result };
            resolve(result)
            mysql_connection.end()
          }
        })
      }
    })
  })
}

module.exports = {
  QueryExecute: async (sql_query) => {
    return await MySqlQueryExecute(sql_query)
  },
}
