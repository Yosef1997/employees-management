const Department = require('../models/departmentModel')

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.getAll()
    res.json(departments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
