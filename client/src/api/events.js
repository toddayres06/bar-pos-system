import api from './axios'

export async function fetchEvents() {
  const response = await api.get('/api/events')

  return response.data.events
}

export async function createEvent(eventData) {
  const response = await api.post(
    '/api/events',
    eventData
  )

  return response.data.event
}