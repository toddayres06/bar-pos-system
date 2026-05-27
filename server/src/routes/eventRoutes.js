import express from 'express'

import {
  createEventHandler,
  getEventsHandler,
  updateEventStatusHandler,
  deleteEventHandler,
} from '../controllers/eventController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createEventHandler)

router.get('/', protect, getEventsHandler)

router.patch(
  '/:id/status',
  protect,
  updateEventStatusHandler
)

router.delete(
  '/:id',
  protect,
  deleteEventHandler
)

export default router