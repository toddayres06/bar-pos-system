import dotenv from 'dotenv'
import app from './app.js'

import eventRoutes from './routes/eventRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 5000

app.use('/api/events', eventRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
