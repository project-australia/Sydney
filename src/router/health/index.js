import { Router } from 'express'
const router = Router()

export default router.get('/', function (req, res) {
  res.status(200)
    .json({ version: '0.0.0', date: new Date() })
})
