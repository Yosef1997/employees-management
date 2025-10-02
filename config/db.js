const sql = require('mssql')
require('dotenv').config()

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  port: 1433,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
  },
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to SQL Server')
    return pool
  })
  .catch((err) => console.log('DB Connection Failed: ', err))

module.exports = { sql, poolPromise }
