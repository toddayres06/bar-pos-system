import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import stripeRoutes from './routes/stripeRoutes.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  })
})

app.use('/api/users', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/protected', protectedRoutes)
app.use('/api/packages', packageRoutes)

// ✅ MOVE THESE HERE
app.use('/api/events', eventRoutes)
app.use('/api/stripe', stripeRoutes)

export default app