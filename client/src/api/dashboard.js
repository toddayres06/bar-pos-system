import api from './axios'

export async function fetchDashboardSummary() {
  const response = await api.get(
    '/api/dashboard/summary'
  )

  return response.data.summary
}