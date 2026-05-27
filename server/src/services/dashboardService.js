import prisma from '../config/prisma.js'

export async function getDashboardSummary() {
  const totalEvents =
    await prisma.event.count()

  const upcomingEvents =
    await prisma.event.findMany({
      orderBy: {
        eventDate: 'asc',
      },

      take: 5,
    })

  const inquiryCount =
    await prisma.event.count({
      where: {
        status: 'INQUIRY',
      },
    })

  const confirmedCount =
    await prisma.event.count({
      where: {
        status: 'CONFIRMED',
      },
    })

  return {
    totalEvents,
    inquiryCount,
    confirmedCount,
    upcomingEvents,
  }
}