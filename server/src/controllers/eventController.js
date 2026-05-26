import {
  createEvent,
  getAllEvents,
} from '../services/eventService.js'

export async function createEventHandler(req, res) {
  try {
    const event = await createEvent(
      req.body,
      req.user.userId
    )

    return res.status(201).json({
      success: true,
      event,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
    })
  }
}

export async function getEventsHandler(req, res) {
  try {
    const events = await getAllEvents()

    return res.json({
      success: true,
      events,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
    })
  }
}