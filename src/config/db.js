const { Pool} =  require("pg");

const pool = new Pool({
  host: process.env.DSMS_DB_HOST,
  user: process.env.DSMS_DB_USER,
  password: process.env.DSMS_DB_PASSWORD,
  database: process.env.DSMS_DB_NAME,
  port: Number(process.env.DSMS_DB_PORT),
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});


const  executeQuery = async (query, parameters, errorMessage) => {
          return new Promise (async (resolve, reject) => {
            pool.query(query, parameters || [], async (error, data) => {
                if (error) {
                    console.error(error);
                    reject(errorMessage ? { errorMessage } : error);
                } else {
                    resolve(data.rows && data.rows.length > 0 ? data.rows : []);
                }
            })
          })
}

module.exports = { executeQuery, pool };