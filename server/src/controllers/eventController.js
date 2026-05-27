import {
  createEvent,
  getAllEvents,
  updateEventStatus,
  deleteEvent
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

export async function updateEventStatusHandler(
  req,
  res
) {
  try {
    const { id } = req.params

    const { status } = req.body

    const updatedEvent =
      await updateEventStatus(id, status)

    res.status(200).json({
      success: true,
      event: updatedEvent,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update event',
    })
  }
}

export async function deleteEventHandler(
  req,
  res
) {
  try {
    const { id } = req.params

    await deleteEvent(id)

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
    })
  }
}