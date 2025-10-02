const Employee = require('../models/employeeModel')

exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const employees = await Employee.getAllWithPagination({
      page,
      limit,
      search,
    })
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.id)
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })
    res.json(employee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getEmployeesWithDepartment = async (req, res) => {
  try {
    const employees = await Employee.getAllWithDepartment()
    res.json(employees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createEmployee = async (req, res) => {
  try {
    const { name, position, salary, departmentId } = req.body
    if (!name || salary <= 0 || !departmentId) {
      return res.status(400).json({ message: 'Invalid input' })
    }

    const newEmployee = await Employee.create({
      name,
      position,
      salary,
      departmentId,
    })
    res.status(201).json({
      message: 'Employee created',
      data: newEmployee,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateEmployee = async (req, res) => {
  try {
    const { name, position, salary, departmentId } = req.body
    if (!name || salary <= 0 || !departmentId) {
      return res.status(400).json({ message: 'Invalid input' })
    }

    const updatedEmployee = await Employee.update(req.params.id, {
      name,
      position,
      salary,
      departmentId,
    })
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    res.json({
      message: 'Employee updated',
      data: updatedEmployee,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.delete(req.params.id)
    res.json({ message: 'Employee deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
