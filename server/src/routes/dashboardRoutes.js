import express from 'express'

import { protect } from '../middleware/authMiddleware.js'

import {
  getDashboardSummaryHandler,
} from '../controllers/dashboardController.js'

const router = express.Router()

router.get(
  '/summary',
  protect,
  getDashboardSummaryHandler
)

export default router