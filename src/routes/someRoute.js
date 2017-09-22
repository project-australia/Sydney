import express from 'express'
import { findAll, create } from '../controllers/someController'
const router = express.Router()

router.get('/', findAll)
router.post('/', create)

export default router
