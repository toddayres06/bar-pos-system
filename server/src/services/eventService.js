import prisma from '../config/prisma.js'

export async function createEvent(data, userId) {
  return prisma.event.create({
    data: {
      ...data,
      createdById: userId,
    },
  })
}

export async function getAllEvents() {
  return prisma.event.findMany({
    include: {
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },

    orderBy: {
      eventDate: 'asc',
    },
  })
}

export async function updateEventStatus(
  eventId,
  status
) {
  return prisma.event.update({
    where: {
      id: eventId,
    },

    data: {
      status,
    },
  })
}

export async function deleteEvent(eventId) {
  return prisma.event.delete({
    where: {
      id: eventId,
    },
  })
}