import { useState, useEffect } from 'react'

import { fetchPackages } from '../api/packages'

export default function EventForm({
  onSubmit,
  loading,
}) {
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

  const [packages, setPackages] = useState([])

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await fetchPackages()

        // IMPORTANT: only allow active packages in event creation flow
        const activePackages = data.filter(
          (pkg) => pkg.isActive
        )

        setPackages(activePackages)
      } catch (error) {
        console.error(error)
      }
    }

    loadPackages()
  }, [])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    await onSubmit({
      ...formData,

      eventDate: new Date(
        formData.eventDate
      ).toISOString(),

      guestCount: Number(formData.guestCount),
    })

    setFormData({
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
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold text-slate-800">
        Create Event
      </h2>

      <input
        type="text"
        name="clientName"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        type="email"
        name="clientEmail"
        placeholder="Client Email"
        value={formData.clientEmail}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        type="text"
        name="clientPhone"
        placeholder="Client Phone"
        value={formData.clientPhone}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        type="datetime-local"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        type="text"
        name="venueName"
        placeholder="Venue Name"
        value={formData.venueName}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        type="text"
        name="venueAddress"
        placeholder="Venue Address"
        value={formData.venueAddress}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <input
        type="number"
        name="guestCount"
        placeholder="Guest Count"
        value={formData.guestCount}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Package
        </label>

        <select
          name="packageId"
          value={formData.packageId}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">
            Select Package
          </option>

          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} — ${pkg.price}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="notes"
        placeholder="Event Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  )
}