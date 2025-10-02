const { poolPromise, sql } = require('../config/db')

class Employee {
  static async getAll() {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT * FROM Employees')
    return result.recordset
  }

  static async getById(id) {
    const pool = await poolPromise
    const result = await pool.request().input('id', sql.Int, id).query(`
        SELECT 
            e.EmployeeID, 
            e.Name,
            e.Position, 
            e.Salary, 
            e.CreatedAt,
            d.DepartmentName
        FROM Employees e 
        LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
        WHERE e.EmployeeID = @id
      `)
    return result.recordset[0]
  }

  static async getAllWithPagination({ page = 1, limit = 10, search = '' }) {
    const offset = (page - 1) * limit
    const pool = await poolPromise

    let query = `
    SELECT 
        e.EmployeeID, 
        e.Name, 
        e.Position, 
        e.Salary, 
        e.CreatedAt,
        d.DepartmentName
    FROM Employees e
    LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE e.Name LIKE @search
    ORDER BY e.EmployeeID
    OFFSET @offset ROWS
    FETCH NEXT @limit ROWS ONLY;
  `

    let countQuery = `
    SELECT COUNT(*) as total FROM Employees
    WHERE Name LIKE @search;
  `

    const result = await pool
      .request()
      .input('search', sql.VarChar, `%${search}%`)
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(query)

    const countResult = await pool
      .request()
      .input('search', sql.VarChar, `%${search}%`)
      .query(countQuery)

    return {
      data: result.recordset,
      total: countResult.recordset[0].total,
      totalPage: Math.round(countResult.recordset[0].total / limit),
      page,
      limit,
    }
  }

  static async create({ name, position, salary, departmentId }) {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('position', sql.VarChar, position)
      .input('salary', sql.Decimal(12, 2), salary)
      .input('departmentId', sql.Int, departmentId).query(`
      INSERT INTO Employees (Name, Position, Salary, DepartmentID) 
      OUTPUT INSERTED.EmployeeID, INSERTED.Name, INSERTED.Position, 
             INSERTED.Salary, INSERTED.CreatedAt, INSERTED.DepartmentID
      VALUES (@name, @position, @salary, @departmentId)
    `)

    return result.recordset[0] // return row baru
  }
  static async create({ name, position, salary, departmentId }) {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('name', sql.VarChar, name)
      .input('position', sql.VarChar, position)
      .input('salary', sql.Decimal(12, 2), salary)
      .input('departmentId', sql.Int, departmentId).query(`
      INSERT INTO Employees (Name, Position, Salary, DepartmentID) 
      OUTPUT INSERTED.EmployeeID, INSERTED.Name, INSERTED.Position, 
             INSERTED.Salary, INSERTED.CreatedAt, INSERTED.DepartmentID
      VALUES (@name, @position, @salary, @departmentId)
    `)

    return result.recordset[0]
  }

  static async update(id, { name, position, salary, departmentId }) {
    const pool = await poolPromise
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, name)
      .input('position', sql.VarChar, position)
      .input('salary', sql.Decimal(12, 2), salary)
      .input('departmentId', sql.Int, departmentId).query(`
      UPDATE Employees 
      SET Name = @name, Position = @position, Salary = @salary, DepartmentID = @departmentId 
      OUTPUT INSERTED.EmployeeID, INSERTED.Name, INSERTED.Position, 
             INSERTED.Salary, INSERTED.CreatedAt, INSERTED.DepartmentID
      WHERE EmployeeID = @id
    `)

    return result.recordset[0]
  }

  static async delete(id) {
    const pool = await poolPromise
    await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Employees WHERE EmployeeID = @id')
  }
}

module.exports = Employee
