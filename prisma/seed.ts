import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const peakyBlinders = await prisma.serie.create({
    data: {
      name: 'Peaky Blinders',
      description:
        'A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up in the world.',
      seasons: 5,
      episodes: 30,
      status: 'FINISHED',
      platforms: {
        set: ['NETFLIX'],
      },
    },
  });

  await prisma.characters.create({
    data: {
      name: 'Tommy Shelby',
      nickName: 'Tommy',
      description:
        'Thomas Michael Shelby OBE DCM MM MP is the leader of the Birmingham criminal gang, the Peaky Blinders, and the patriarch of the Shelby Family.',
      age: 40,
      favoritePhrase: 'I think, therefore I am',
      isProtagonit: true,
      enemies: {
        set: [
          'Alfie Solomons',
          'Billy Kimber',
          'Luca Changretta',
          'Oswald Mosley',
          'Michael Gray',
        ],
      },
      friends: {
        set: [
          'Arthur Shelby',
          'John Shelby',
          'Ada Shelby',
          'Polly Gray',
          'Lizzie Stark',
          'Grace Burgess',
          'May Carleton',
          'Linda Shelby',
        ],
      },
      personalities: {
        set: [
          'Intelligent',
          'Charismatic',
          'Ambitious',
          'Leader',
          'Loyal',
          'Brave',
        ],
      },
      serie: {
        connect: { id: peakyBlinders.id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
