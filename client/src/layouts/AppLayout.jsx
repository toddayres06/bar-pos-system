import { Outlet, NavLink } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaGlassCheers,
  FaMoneyBillWave,
  FaBoxOpen,
  FaChartBar,
} from 'react-icons/fa'

const navItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: FaChartBar,
  },
  {
    label: 'Events',
    path: '/events',
    icon: FaCalendarAlt,
  },
  {
    label: 'Packages',
    path: '/packages',
    icon: FaBoxOpen,
  },
  {
    label: 'Tabs',
    path: '/tabs',
    icon: FaGlassCheers,
  },
  {
    label: 'Payments',
    path: '/payments',
    icon: FaMoneyBillWave,
  },
]

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">

        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            T&J Events
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Operations Platform
          </p>
        </div>

        <nav className="space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            )
          })}

        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-14 bg-white border-b px-6 flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-slate-700">
              Internal Dashboard
            </h2>
          </div>

          <div className="text-sm text-slate-500">
            Admin User
          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}