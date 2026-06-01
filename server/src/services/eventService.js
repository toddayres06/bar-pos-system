import prisma from '../config/prisma.js'

export async function createEvent(data, userId) {
  return prisma.event.create({
    data: {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,

      eventDate: new Date(data.eventDate),

      venueName: data.venueName,
      venueAddress: data.venueAddress,

      guestCount: Number(data.guestCount),

      notes: data.notes,

      createdById: userId,

      packageId: data.packageId || null,
    },

    include: {
      package: true,
    },
  })
}

export async function getAllEvents() {
  return prisma.event.findMany({
    include: {
      package: true,

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

export async function getEventById(id) {
  return prisma.event.findUnique({
    where: {
      id,
    },
  })
}

export async function updateEvent(
  eventId,
  data
) {
  return prisma.event.update({
    where: {
      id: eventId,
    },

    data: {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,

      eventDate: new Date(
        data.eventDate
      ),

      venueName: data.venueName,
      venueAddress: data.venueAddress,

      guestCount: Number(
        data.guestCount
      ),

      notes: data.notes,

      packageId:
        data.packageId || null,
    },

    include: {
      package: true,
    },
  })
}