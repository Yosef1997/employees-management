const { poolPromise, sql } = require('../config/db')

class Department {
  static async getAll() {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT * FROM Departments')
    return result.recordset
  }
}
module.exports = Department
