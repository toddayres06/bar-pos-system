import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import EventForm from '../components/EventForm'

import {
  fetchEvents,
  createEvent,
  updateEventStatus,
} from '../api/events'

export default function EventsPage() {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [showArchived, setShowArchived] = useState(false)

  // 🔁 Unified loader (always source of truth)
  async function loadEvents() {
    try {
      const data = await fetchEvents(showArchived)
      setEvents(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 🔁 Refetch whenever toggle changes
  useEffect(() => {
    loadEvents()
  }, [showArchived])

  // ➕ Create event (always refetch to avoid stale state issues)
  async function handleCreateEvent(formData) {
    try {
      setLoading(true)

      await createEvent(formData)

      // ensure UI stays consistent with backend filter state
      await loadEvents()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 🔄 Status update (optimistic local update)
  async function handleStatusUpdate(id, status) {
    try {
      const updated = await updateEventStatus(id, status)

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? updated : event
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Events
          </h1>

          <p className="text-slate-500 mt-1">
            Manage upcoming bookings and event details.
          </p>
        </div>

        {/* TOGGLE VIEW */}
        <button
          onClick={() => setShowArchived((prev) => !prev)}
          className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition"
        >
          {showArchived
            ? 'Show Active Events'
            : 'Show Archived Events'}
        </button>

      </div>

      {/* CREATE FORM (hidden in archive view) */}
      {!showArchived && (
        <EventForm
          onSubmit={handleCreateEvent}
          loading={loading}
        />
      )}

      {/* EVENTS LIST */}
      <div className="grid gap-4">

        {/* EMPTY STATE */}
        {events.length === 0 && (
          <div className="bg-white border rounded-xl p-6 text-slate-500">
            {showArchived
              ? 'No archived events found.'
              : 'No active events found.'}
          </div>
        )}

        {/* EVENT CARDS */}
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-white border rounded-xl p-5 shadow-sm cursor-pointer hover:border-slate-400 transition"
          >

            <div className="flex justify-between items-start">

              {/* LEFT SIDE */}
              <div>

                <h2 className="text-lg font-semibold text-slate-800">
                  {event.clientName}
                </h2>

                <p className="text-sm text-slate-500">
                  {event.venueName}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {new Date(event.eventDate).toLocaleString()}
                </p>

                {/* ACTIONS ONLY FOR ACTIVE VIEW */}
                {!showArchived && (
                  <div className="flex gap-2 mt-3">

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusUpdate(event.id, 'CONFIRMED')
                      }}
                      className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusUpdate(event.id, 'COMPLETED')
                      }}
                      className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Complete
                    </button>

                  </div>
                )}

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