var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.status(200)
    .json({ version: '0.0.0', date: new Date() })
})

module.exports = router
