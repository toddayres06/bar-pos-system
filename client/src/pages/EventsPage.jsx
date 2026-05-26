import { useEffect, useState } from 'react'

import EventForm from '../components/EventForm'

import {
  fetchEvents,
  createEvent,
} from '../api/events'

export default function EventsPage() {
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

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Events
        </h1>

        <p className="text-slate-500 mt-1">
          Manage upcoming bookings and event details.
        </p>
      </div>

      <EventForm
        onSubmit={handleCreateEvent}
        loading={loading}
      />

      <div className="grid gap-4">

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start">

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
              </div>

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