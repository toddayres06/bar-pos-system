import express from 'express'

import {
  getPackagesHandler,
  createPackageHandler,
  updatePackageHandler,
  togglePackageStatusHandler,
  archivePackageHandler,
} from '../controllers/packageController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get(
  '/',
  protect,
  getPackagesHandler
)

router.post(
  '/',
  protect,
  createPackageHandler
)

router.patch(
  '/:id',
  protect,
  updatePackageHandler
)

router.patch(
  '/:id/status',
  protect,
  togglePackageStatusHandler
)

router.patch('/:id/archive', protect, archivePackageHandler)

export default router