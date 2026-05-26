import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './routes/ProtectedRoute'

import AppLayout from './layouts/AppLayout'

import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import PackagesPage from './pages/PackagesPage'
import TabsPage from './pages/TabsPage'
import PaymentsPage from './pages/PaymentsPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/tabs" element={<TabsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Route>

    </Routes>
  )
}

export default App