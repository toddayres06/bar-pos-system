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

main()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })