const express = require('express')
const router = express.Router()
const controller = require('../controllers/employeeController')

// CRUD Routes
router.get('/', controller.getEmployees)
router.get('/with-department', controller.getEmployeesWithDepartment)
router.get('/:id', controller.getEmployee)
router.post('/', controller.createEmployee)
router.put('/:id', controller.updateEmployee)
router.delete('/:id', controller.deleteEmployee)

module.exports = router
