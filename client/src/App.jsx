import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'

function Dashboard() {
  return (
    <div className="text-slate-800 text-2xl font-semibold">
      Dashboard Overview
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App