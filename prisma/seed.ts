import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          body: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
    passwordResets: {
      create: [
        {
          token: 'alice-token',
          expires: new Date(Date.now() + 3600 * 1000),
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          body: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          body: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          body: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

export async function main() {
  try {
    console.log('Deleting database...')
    await prisma.post.deleteMany({})
    await prisma.passwordReset.deleteMany({})
    await prisma.user.deleteMany({})
    console.log('Creating users...')
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log('Finished!')
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
