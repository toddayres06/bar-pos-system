import {
  getDashboardSummary,
} from '../services/dashboardService.js'

export async function getDashboardSummaryHandler(
  req,
  res
) {
  try {
    const summary =
      await getDashboardSummary()

    res.status(200).json({
      success: true,
      summary,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message:
        'Failed to fetch dashboard summary',
    })
  }
}