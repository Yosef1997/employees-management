require('dotenv').config()
const express = require('express')
const employeeRoutes = require('./routes/employeeRoutes')
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())

// API Routes
app.use('/api/v1/employees', auth, employeeRoutes)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
