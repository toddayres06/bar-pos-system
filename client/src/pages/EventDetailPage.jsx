import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { fetchEventById } from '../api/events'

export default function EventDetailPage() {
  const { id } = useParams()

  const [event, setEvent] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvent() {
      try {
        const data =
          await fetchEventById(id)

        setEvent(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [id])

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading event...
      </p>
    )
  }

  if (!event) {
    return (
      <p className="text-red-500">
        Event not found
      </p>
    )
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {event.clientName}
        </h1>

        <p className="text-slate-500 mt-1">
          Event Details
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Client Email
          </p>

          <p className="font-medium">
            {event.clientEmail}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Venue
          </p>

          <p className="font-medium">
            {event.venueName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Guest Count
          </p>

          <p className="font-medium">
            {event.guestCount}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p className="font-medium">
            {event.status}
          </p>
        </div>

      </div>

    </div>
  )
}