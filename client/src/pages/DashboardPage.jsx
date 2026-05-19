import DashboardCard from '../components/DashboardCard'
import SectionCard from '../components/SectionCard'

export default function DashboardPage() {
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
          title="Upcoming Events"
          value="12"
          subtitle="3 scheduled this week"
        />

        <DashboardCard
          title="Monthly Revenue"
          value="$8,420"
          subtitle="Current projected revenue"
        />

        <DashboardCard
          title="Open Tabs"
          value="5"
          subtitle="Currently active"
        />

        <DashboardCard
          title="Pending Payments"
          value="$1,250"
          subtitle="Awaiting deposits"
        />

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Upcoming Events */}
        <div className="xl:col-span-2">
          <SectionCard title="Upcoming Events">

            <div className="space-y-4">

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Johnson Wedding
                    </h3>

                    <p className="text-sm text-slate-500">
                      May 28 • 180 Guests
                    </p>
                  </div>

                  <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Corporate Mixer
                    </h3>

                    <p className="text-sm text-slate-500">
                      June 2 • 90 Guests
                    </p>
                  </div>

                  <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    Deposit Pending
                  </span>
                </div>
              </div>

            </div>

          </SectionCard>
        </div>

        {/* Quick Actions */}
        <div>
          <SectionCard title="Quick Actions">

            <div className="space-y-3">

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-3 text-sm font-medium transition">
                Create Event
              </button>

              <button className="w-full border border-slate-300 hover:bg-slate-100 rounded-lg py-3 text-sm font-medium transition">
                Open Drink Tab
              </button>

              <button className="w-full border border-slate-300 hover:bg-slate-100 rounded-lg py-3 text-sm font-medium transition">
                Create Package
              </button>

            </div>

          </SectionCard>
        </div>

      </div>

    </div>
  )
}