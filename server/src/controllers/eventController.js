import {
  createEvent,
  getAllEvents,
  updateEventStatus,
  getEventById,
  deleteEvent,
  updateEvent,
  archiveEvent,
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
    const { archived } = req.query

    const events = await getAllEvents(archived)

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

export async function updateEventHandler(
  req,
  res
) {
  try {
    const updatedEvent =
      await updateEvent(
        req.params.id,
        req.body
      )

    return res.status(200).json({
      success: true,
      event: updatedEvent,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
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

export async function getEventByIdHandler(
  req,
  res
) {
  try {
    const event = await getEventById(
      req.params.id
    )

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    return res.status(200).json({
      success: true,
      event,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
    })
  }
}

export async function archiveEventHandler(req, res) {
  try {
    const { id } = req.params

    const event = await archiveEvent(id)

    return res.status(200).json({
      success: true,
      event,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to archive event',
    })
  }
}