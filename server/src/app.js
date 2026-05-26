import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'

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

app.use('/api/auth', authRoutes)

app.use('/api/protected', protectedRoutes)

export default app