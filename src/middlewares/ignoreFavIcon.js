module.exports = function (req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true })
  } else {
    next()
  }
}
