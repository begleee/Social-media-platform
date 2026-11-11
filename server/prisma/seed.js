import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../generated/prisma/client';
import { env } from 'prisma/config';
import { faker } from '@faker-js/faker';

const DB_URL_MAP = {
  neon: env('DB_URL'),
  local: env('LOCAL_DB_URL'),
  test: env('TEST_DB_URL'),
};

const currentEnv = env('APP_ENV') || 'local';
const connectionString = DB_URL_MAP[currentEnv];

if (!connectionString) {
  throw new Error(`No database URL configured for APP_ENV="${currentEnv}".`);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  await prisma.imageUrl.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();
  console.log("Database wiped clean.");

  const userCount = 15;
  const createdUsers = [];

  console.log(`Seeding ${userCount} users...`);
  for (let i = 0; i < userCount; i++) {
    const role = i === 0 ? Role.ADMIN : Role.USER; 

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password({ length: 12 }),
        avatarUrl: faker.image.avatar(),
        role: role,
        resetPasswordToken: faker.datatype.boolean(0.2) ? faker.string.uuid() : null,
        resetPasswordExpires: faker.datatype.boolean(0.2) ? faker.date.future() : null,
      },
    });
    createdUsers.push(user);
  }

  console.log("Seeding social graph (Follows)...");
  for (const user of createdUsers) {
    const potentialFollowing = createdUsers.filter(u => u.id !== user.id);
    const chosenToFollow = faker.helpers.arrayElements(potentialFollowing, 3);

    for (const followedUser of chosenToFollow) {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followedUser.id,
        },
      }).catch(() => {
      });
    }
  }

  console.log("Seeding posts and image attachments...");
  const createdPosts = [];
  for (const user of createdUsers) {
    const postLoops = faker.number.int({ min: 1, max: 4 });
    
    for (let p = 0; p < postLoops; p++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence({ min: 4, max: 8 }),
          details: faker.lorem.paragraphs(2),
          userId: user.id,
          imageUrls: {
            create: faker.datatype.boolean(0.7) ? [
              { id: faker.string.uuid(), url: faker.image.url() },
              { id: faker.string.uuid(), url: faker.image.url() }
            ] : []
          }
        },
      });
      createdPosts.push(post);
    }
  }

  console.log("Seeding comments and reactions...");
  for (const post of createdPosts) {
    const interactors = faker.helpers.arrayElements(createdUsers, faker.number.int({ min: 2, max: 6 }));

    for (const interactor of interactors) {
      if (faker.datatype.boolean(0.5)) {
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            userId: interactor.id,
            postId: post.id,
          },
        });
      }

      if (faker.datatype.boolean(0.6)) {
        await prisma.like.create({
          data: {
            userId: interactor.id,
            postId: post.id,
          },
        }).catch(() => {});
      }
    }
  }

  console.log("Mock database seeding operation completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
