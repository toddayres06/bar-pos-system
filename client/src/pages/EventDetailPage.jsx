import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  fetchEventById,
  updateEvent,
} from '../api/events'

import { fetchPackages } from '../api/packages'

export default function EventDetailPage() {
  const { id } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState(false)
  const [packages, setPackages] = useState([])

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    venueName: '',
    venueAddress: '',
    guestCount: '',
    notes: '',
    packageId: '',
  })

  useEffect(() => {
    async function loadEvent() {
      try {
        const eventData = await fetchEventById(id)
        const packageData = await fetchPackages()

        setEvent(eventData)
        setPackages(packageData)

        setFormData({
          clientName: eventData.clientName || '',
          clientEmail: eventData.clientEmail || '',
          clientPhone: eventData.clientPhone || '',
          eventDate:
            eventData.eventDate
              ? eventData.eventDate.slice(0, 16)
              : '',
          venueName: eventData.venueName || '',
          venueAddress: eventData.venueAddress || '',
          guestCount: eventData.guestCount || '',
          notes: eventData.notes || '',
          packageId: eventData.packageId || '',
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [id])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSave() {
    try {
      const updated = await updateEvent(id, {
        ...formData,
        guestCount: Number(formData.guestCount),
        eventDate: new Date(formData.eventDate).toISOString(),
      })

      setEvent(updated)
      setEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <p className="text-slate-500">Loading event...</p>
    )
  }

  if (!event) {
    return (
      <p className="text-red-500">Event not found</p>
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {event.clientName}
        </h1>

        <p className="text-slate-500 mt-1">
          Event Details
        </p>

        <button
          onClick={() => setEditing(!editing)}
          className="mt-3 text-sm px-3 py-1 bg-slate-900 text-white rounded"
        >
          {editing ? 'Cancel Edit' : 'Edit Event'}
        </button>
      </div>

      {/* VIEW MODE */}
      {!editing && (
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

          <div>
            <p className="text-sm text-slate-500">Client Email</p>
            <p className="font-medium">{event.clientEmail}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Venue</p>
            <p className="font-medium">{event.venueName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Guest Count</p>
            <p className="font-medium">{event.guestCount}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium">{event.status}</p>
          </div>

        </div>
      )}

      {/* EDIT MODE */}
      {editing && (
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Client Name"
          />

          <input
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Client Email"
          />

          <input
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Client Phone"
          />

          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Venue Name"
          />

          <input
            name="venueAddress"
            value={formData.venueAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Venue Address"
          />

          <input
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Guest Count"
          />

          <select
            name="packageId"
            value={formData.packageId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - ${pkg.price}
              </option>
            ))}
          </select>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Notes"
          />

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>

        </div>
      )}

    </div>
  )
}