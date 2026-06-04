import api from './axios'

export async function fetchEvents(
  showArchived = false
) {
  const response =
    await api.get('/api/events', {
      params: {
        archived: showArchived,
      },
    })

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

export async function fetchEventById(id) {
  const response = await api.get(
    `/api/events/${id}`
  )

  return response.data.event
}

export async function updateEvent(
  id,
  eventData
) {
  const response = await api.patch(
    `/api/events/${id}`,
    eventData
  )

  return response.data.event
}

export async function archiveEvent(id) {
  const response = await api.patch(`/api/events/${id}/archive`)
  return response.data.event
}

export async function restoreEvent(id) {
  const response =
    await api.patch(
      `/api/events/${id}/restore`
    )

  return response.data.event
}