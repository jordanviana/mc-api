require("dotenv").config();
import mysql from 'mysql';
const {
    APP_MYSQL_HOST,
    APP_MYSQL_USER,
    APP_MYSQL_PWD,
    APP_MYSQL_DB,
} = process.env

const config = {
  host     : APP_MYSQL_HOST,
  user     : APP_MYSQL_USER,
  password : APP_MYSQL_PWD,
  database : APP_MYSQL_DB
};

const connection = mysql.createConnection(config);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// connection.end();
export const MySQLQuery = async (query = "", params = []) => {
    return new Promise((suc, fail)=>{
        connection.query(query, params, function (error, results, fields) {
            if (error) {
                fail(error);
            } else {
                suc(results)
            }
          });
    })
}


