import express from 'express'

import {
  createEventHandler,
  getEventsHandler,
} from '../controllers/eventController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createEventHandler)

router.get('/', protect, getEventsHandler)

export default router