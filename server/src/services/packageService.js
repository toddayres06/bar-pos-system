import prisma from '../config/prisma.js'

export async function getPackages() {
  return prisma.package.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function createPackage(data) {
  return prisma.package.create({
    data,
  })
}

export async function updatePackage(
  id,
  data
) {
  return prisma.package.update({
    where: {
      id,
    },
    data,
  })
}

export async function togglePackageStatus(
  id,
  isActive
) {
  return prisma.package.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  })
}