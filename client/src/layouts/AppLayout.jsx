import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">
          T&J Events
        </h1>

        <nav className="space-y-3 text-sm">
          <div className="hover:bg-slate-800 p-2 rounded">Dashboard</div>
          <div className="hover:bg-slate-800 p-2 rounded">Events</div>
          <div className="hover:bg-slate-800 p-2 rounded">Packages</div>
          <div className="hover:bg-slate-800 p-2 rounded">Tabs</div>
          <div className="hover:bg-slate-800 p-2 rounded">Payments</div>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center px-6">
          <h2 className="font-semibold text-slate-700">
            Dashboard
          </h2>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}