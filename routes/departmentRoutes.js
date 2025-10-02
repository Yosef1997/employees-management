const express = require('express')
const router = express.Router()
const controller = require('../controllers/departmentController')

// CRUD Routes
router.get('/', controller.getDepartments)

module.exports = router
