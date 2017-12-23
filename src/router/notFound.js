function notFound (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  res.json('not found')
  next(err)
}

module.exports = { notFound }
