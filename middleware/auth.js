module.exports = function (req, res, next) {
  const token = req.headers['x-api-key']
  if (!token || token !== 'secret123') {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
