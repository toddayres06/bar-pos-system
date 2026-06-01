import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      firstName: 'Todd',
      lastName: 'Ayres',
      email: 'toddayres06@gmail.com',
      password: 'password123',
      role: 'ADMIN',
    },
    {
      firstName: 'Jenasis',
      lastName: 'Rivera',
      email: 'jenasisrivera03@gmail.com',
      password: 'password123',
      role: 'ADMIN',
    },
  ]

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(
      user.password,
      10
    )

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        passwordHash: hashedPassword,
        role: user.role,
      },
    })
  }

  console.log('Seed completed successfully')
}

const packages = [
  {
    name: 'Silver Package',
    description:
      'Basic bartending service package',
    price: 1200,
  },
  {
    name: 'Gold Package',
    description:
      'Enhanced event bartending experience',
    price: 2500,
  },
  {
    name: 'Platinum Package',
    description:
      'Luxury full-service cocktail experience',
    price: 4000,
  },
]

for (const pkg of packages) {
  await prisma.package.upsert({
    where: {
      name: pkg.name,
    },
    update: {},
    create: pkg,
  })
}

main()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })