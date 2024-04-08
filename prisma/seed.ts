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

  await Promise.all([
    prisma.characters.create({
      data: {
        name: 'Thomas Shelby',
        nickName: 'Tommy',
        description:
          'Thomas Michael Shelby OBE DCM MM MP is the leader of the Birmingham criminal gang, the Peaky Blinders, and the patriarch of the Shelby Family.',
        age: 40,
        favoritePhrase: 'I think, therefore I am',
        isProtagonist: true,
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
        image:
          'https://imgs.search.brave.com/Is5OKTxXo5UsYsqlqUPINgZwxFKbtqR_ScIDA42ZcTc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg2L2M1/L2JhLzg2YzViYTA4/MWUzNGU3ZmE1ZTdk/YzZlNDA0YTc0MTZi/LmpwZw',
        serie: {
          connect: { id: peakyBlinders.id },
        },
      },
    }),
    prisma.characters.create({
      data: {
        name: 'Arthur Shelby',
        nickName: 'Arthur',
        description:
          'Arthur Shelby Jr. is the eldest Shelby sibling, tough, responsible, and a prominent member of the Peaky Blinders.',
        age: 45,
        favoritePhrase: 'By order of the Peaky Blinders',
        isProtagonist: true,
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
            'Tommy Shelby',
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
          set: ['Brave', 'Loyal', 'Aggressive', 'Impulsive'],
        },
        image:
          'https://imgs.search.brave.com/nkwlyn8mYmJby53-mWo6qrkegZF3PxfVSaUwEMQ6xKQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0Lzc1/LzE5LzE0NzUxOThm/YjhjOGYxZTIyNGUw/ZTkzNjRkZWMyOTI4/LmpwZw',
        serie: {
          connect: { id: peakyBlinders.id },
        },
      },
    }),
    prisma.characters.create({
      data: {
        name: 'Elizabeth Pollyanna',
        nickName: 'Aunt Polly',
        description:
          'Elizabeth Polly Gray, is the matriarch of the Shelby Family and the treasurer of the Shelby Company Limited.',
        age: 55,
        favoritePhrase: 'The Peaky Blinders are off limits',
        isProtagonist: true,
        enemies: {
          set: ['Thomas Shelby', 'Billy Kimber', 'Luca Changretta'],
        },
        friends: {
          set: [
            'Tommy Shelby',
            'Arthur Shelby',
            'John Shelby',
            'Ada Shelby',
            'Lizzie Stark',
            'Michael Gray',
          ],
        },
        personalities: {
          set: ['Wise', 'Tough', 'Determined', 'Cunning'],
        },
        image:
          'https://imgs.search.brave.com/ZCEdZyid44lHZ2zQcH--obwNUctB_fPggViqZ-R1VJ8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wMi50/cnJzZi5jb20vaW1h/Z2UvZmdldC9jZi83/NzQvMC9pbWFnZXMu/dGVycmEuY29tLzIw/MjIvMDIvMjgvMTM4/NjQ1MDYwOC1wZWFr/eS1ibGluZGVycy1h/dW50LXBvbGx5LWhl/bGVuLW1jY3Jvcnku/anBn',
        serie: {
          connect: { id: peakyBlinders.id },
        },
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
