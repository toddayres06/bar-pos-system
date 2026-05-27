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

export async function updateEventStatus(id, status) {
  const response = await api.patch(
    `/api/events/${id}/status`,
    { status }
  )

  return response.data.event
}

export async function deleteEvent(id) {
  const response = await api.delete(
    `/api/events/${id}`
  )

  return response.data
}