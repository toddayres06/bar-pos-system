import express from 'express'

import {
  createEventHandler,
  getEventsHandler,
  updateEventStatusHandler,
  updateEventHandler,
  getEventByIdHandler,
  deleteEventHandler,
  archiveEventHandler,
  restoreEventHandler,
  createEventCheckoutHandler,
} from '../controllers/eventController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createEventHandler)

router.get('/', protect, getEventsHandler)

router.post(
  '/:id/checkout',
  protect,
  createEventCheckoutHandler
)
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

router.patch(
  '/:id/archive',
   protect,
   archiveEventHandler
)

router.patch(
  '/:id/restore',
  protect,
  restoreEventHandler
)

router.delete(
  '/:id',
  protect,
  deleteEventHandler
)

export default router