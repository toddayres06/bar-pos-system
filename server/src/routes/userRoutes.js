import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()

  res.status(200).json({
    success: true,
    data: users,
  })
})

export default router