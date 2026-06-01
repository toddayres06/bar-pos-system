import express from 'express'

import {
  createEventHandler,
  getEventsHandler,
  updateEventStatusHandler,
  updateEventHandler,
  getEventByIdHandler,
  deleteEventHandler,
} from '../controllers/eventController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createEventHandler)

router.get('/', protect, getEventsHandler)

router.get(
  '/:id',
  protect,
  getEventByIdHandler
)

router.patch(
  '/:id',
  protect,
  updateEventHandler
)

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