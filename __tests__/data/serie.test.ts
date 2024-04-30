import { createSerieDatasource } from '../../src/data/serie';
import prisma from '../../src/lib/prismaClient';

beforeAll(async () => {
  await prisma.serie.deleteMany();
});

afterAll(async () => {
  await prisma.serie.deleteMany();
});

describe('> data/serie.ts - serieDataSource', () => {
  const serieDataSource = createSerieDatasource();

  test('Calling "getAll" method', async () => {
    const firstCreatedSerie = await prisma.serie.create({
      data: {
        name: 'Peaky Blinders',
        description:
          'A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up in the world.',
        episodes: 30,
        platforms: ['Netflix'],
        seasons: 5,
        status: 'FINISHED',
      },
    });

    const secondCreatedSerie = await prisma.serie.create({
      data: {
        name: 'Breaking Bad',
        description:
          "A high school chemistry teacher turned meth maker partners with a former student to secure his family's future.",
        episodes: 62,
        platforms: ['Netflix'],
        seasons: 5,
        status: 'FINISHED',
      },
    });

    const returnedSeries = await serieDataSource.getAll();

    expect(returnedSeries).toStrictEqual({
      error: undefined,
      returnedSeries: [
        {
          id: firstCreatedSerie.id,
          __typename: 'Serie',
          name: 'Peaky Blinders',
        },
        {
          id: secondCreatedSerie.id,
          __typename: 'Serie',
          name: 'Breaking Bad',
        },
      ],
    });
  });

  test('Calling "getByName" method', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'The Office',
        description:
          'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
        episodes: 201,
        platforms: ['Netflix'],
        seasons: 9,
        status: 'FINISHED',
      },
    });

    const { returnedSerie } = await serieDataSource.getByName('The Office');

    expect(returnedSerie).toStrictEqual({
      __typename: 'Serie',
      id: createdSerie.id,
      name: 'The Office',
      description:
        'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
      episodes: 201,
      platforms: ['Netflix'],
      seasons: 9,
      status: 'FINISHED',
      characters: [],
    });
  });

  test('Calling "getById" method', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'The Simpsons',
        description:
          'The satiric adventures of a working-class family in the misfit city of Springfield.',
        episodes: 706,
        platforms: ['Disney+'],
        seasons: 32,
        status: 'FINISHED',
      },
    });

    const { returnedSerie } = await serieDataSource.getById(createdSerie.id);

    expect(returnedSerie).toStrictEqual({
      __typename: 'Serie',
      id: createdSerie.id,
      name: 'The Simpsons',
      description:
        'The satiric adventures of a working-class family in the misfit city of Springfield.',
      episodes: 706,
      platforms: ['Disney+'],
      seasons: 32,
      status: 'FINISHED',
      characters: [],
    });
  });

  test('Calling "create" method', async () => {
    const { createdSerie } = await serieDataSource.create({
      name: 'The Mandalorian',
      description:
        'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
      episodes: 16,
      platforms: ['Disney+'],
      seasons: 2,
      status: 'FINISHED',
    });

    const foundSerie = await serieDataSource.getById(createdSerie?.id ?? '');

    expect(foundSerie).toStrictEqual({
      errors: undefined,
      returnedSerie: {
        __typename: 'Serie',
        id: createdSerie?.id,
        name: 'The Mandalorian',
        description:
          'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
        episodes: 16,
        platforms: ['Disney+'],
        seasons: 2,
        status: 'FINISHED',
        characters: [],
      },
    });
  });

  test('Calling "update" method', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'The Witcher',
        description:
          'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
        episodes: 16,
        platforms: ['Netflix'],
        seasons: 2,
        status: 'FINISHED',
      },
    });

    const { updatedSerie } = await serieDataSource.updateById(createdSerie.id, {
      name: 'The Witcher',
      description:
        'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
      episodes: 16,
      platforms: ['Netflix'],
      seasons: 2,
      status: 'IN_PROGRESS',
    });

    expect(updatedSerie).toStrictEqual({
      id: updatedSerie.id,
      __typename: 'Serie',
      name: 'The Witcher',
      description:
        'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
      episodes: 16,
      platforms: ['Netflix'],
      seasons: 2,
      status: 'IN_PROGRESS',
    });
  });

  test('Calling "delete" method', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'The Crown',
        description:
          'Follows the political rivalries and romance of Queen Elizabeth II.',
        episodes: 40,
        platforms: ['Netflix'],
        seasons: 4,
        status: 'FINISHED',
      },
    });

    const { deletedSerie } = await serieDataSource.deleteById(createdSerie.id);
    expect(deletedSerie).toStrictEqual([]);
  });
});
