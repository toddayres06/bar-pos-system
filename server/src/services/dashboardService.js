import prisma from '../config/prisma.js'

export async function getDashboardSummary() {
  const totalEvents =
    await prisma.event.count({
      where: {
        isArchived: false,
      },
    })

  const upcomingEvents = await prisma.event.findMany({
  where: {
    isArchived: false,
    status: {
      not: 'CANCELLED',
    },
  },
  orderBy: {
    eventDate: 'asc',
  },
  take: 5,
})

  const inquiryCount =
    await prisma.event.count({
      where: {
        status: 'INQUIRY',
        isArchived: false,
      },
    })

  const confirmedCount =
    await prisma.event.count({
      where: {
        status: 'CONFIRMED',
        isArchived: false,
      },
    })

  return {
    totalEvents,
    inquiryCount,
    confirmedCount,
    upcomingEvents,
  }
}