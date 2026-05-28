import { useEffect, useState } from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import EventForm from '../components/EventForm'

import {
  fetchEvents,
  createEvent,
  updateEventStatus,
  deleteEvent,
} from '../api/events'

export default function EventsPage() {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])

  const [loading, setLoading] = useState(false)

  async function loadEvents() {
    try {
      const data = await fetchEvents()

      setEvents(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function handleCreateEvent(formData) {
    try {
      setLoading(true)

      const newEvent = await createEvent(formData)

      setEvents((prev) => [newEvent, ...prev])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(id, status) {
    try {
      const updated =
        await updateEventStatus(
          id,
          status
        )

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id
            ? updated
            : event
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEvent(id)

      setEvents((prev) =>
        prev.filter(
          (event) => event.id !== id
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Events
        </h1>

        <p className="text-slate-500 mt-1">
          Manage upcoming bookings and event details.
        </p>
      </div>

      {/* CREATE EVENT FORM */}
      <EventForm
        onSubmit={handleCreateEvent}
        loading={loading}
      />

      {/* EVENTS LIST */}
      <div className="grid gap-4">

        {events.map((event) => (
          <div
            key={event.id}
            onClick={() =>
              navigate(
                `/events/${event.id}`
              )
            }
            className="bg-white border rounded-xl p-5 shadow-sm cursor-pointer hover:border-slate-400 transition"
          >
            <div className="flex justify-between items-start">

              {/* EVENT INFO */}
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {event.clientName}
                </h2>

                <p className="text-sm text-slate-500">
                  {event.venueName}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {new Date(
                    event.eventDate
                  ).toLocaleString()}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      handleStatusUpdate(
                        event.id,
                        'CONFIRMED'
                      )
                    }}
                    className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      handleStatusUpdate(
                        event.id,
                        'COMPLETED'
                      )
                    }}
                    className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Complete
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      handleDelete(event.id)
                    }}
                    className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>

                </div>
              </div>

              {/* STATUS BADGE */}
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {event.status}
              </span>

            </div>
          </div>
        ))}

      </div>

    </div>
  )
}