import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DashboardCard from '../components/DashboardCard'
import SectionCard from '../components/SectionCard'

import {
  fetchDashboardSummary,
} from '../api/dashboard'

export default function DashboardPage() {
  const [summary, setSummary] = useState(null)

  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  async function loadDashboard() {
    try {
      const data =
        await fetchDashboardSummary()

      setSummary(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
  return (
    <div className="text-slate-500">
      Loading dashboard...
    </div>
  )
}

if (!summary) {
  return (
    <div className="text-red-500">
      Failed to load dashboard.
    </div>
  )
}

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Internal operations overview for T&J Event Services
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <DashboardCard
          title="Total Events"
          value={summary.totalEvents}
          subtitle="All tracked bookings"
        />

        <DashboardCard
          title="Inquiry Events"
          value={summary.inquiryCount}
          subtitle="Awaiting confirmation"
        />

        <DashboardCard
          title="Confirmed Events"
          value={summary.confirmedCount}
          subtitle="Booked successfully"
        />

        <DashboardCard
          title="Upcoming Events"
          value={summary.upcomingEvents.length}
          subtitle="Next scheduled bookings"
        />

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Upcoming Events */}
        <div className="xl:col-span-2">

          <SectionCard title="Upcoming Events">

            <div className="space-y-4">

              {summary.upcomingEvents.map(
                (event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {event.clientName}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {event.venueName}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {new Date(
                            event.eventDate
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {event.status}
                      </span>

                    </div>
                  </div>
                )
              )}

            </div>

          </SectionCard>

        </div>

        {/* Quick Actions */}
        <div>

          <SectionCard title="Quick Actions">

            <div className="space-y-3">

              <button
                onClick={() => navigate('/events')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-3 text-sm font-medium transition"
              >
                Create Event
              </button>

              <button className="w-full border border-slate-300 hover:bg-slate-100 rounded-lg py-3 text-sm font-medium transition">
                Open Drink Tab
              </button>

              <button
                onClick={() => navigate('/packages')}
                className="w-full border border-slate-300 hover:bg-slate-100 rounded-lg py-3 text-sm font-medium transition"
              >
                Create Package
              </button>
            </div>

          </SectionCard>

        </div>

      </div>

    </div>
  )
}