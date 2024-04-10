import { gql } from '@apollo/client';

import { client } from '../../src/lib/clientApi';
import prisma from '../../src/lib/prismaClient';

beforeEach(async () => {
  await prisma.serie.deleteMany();

  await prisma.serie.create({
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
});

afterAll(async () => {
  await prisma.serie.deleteMany();
});

describe('> Serie schema (Query)', () => {
  test('Trying to get all series', async () => {
    const { data } = await client.query({
      query: gql`
        query {
          series {
            name
            seasons
            status
            platforms
          }
        }
      `,
    });

    expect(data.series).toStrictEqual([
      {
        __typename: 'Serie',
        name: 'Peaky Blinders',
        seasons: 5,
        status: 'FINISHED',
        platforms: ['NETFLIX'],
      },
    ]);
  });
  test('Trying to get serie by name', async () => {
    const { data } = await client.query({
      query: gql`
        query ($name: String!) {
          getSerieByName(name: $name) {
            name
            seasons
            status
            platforms
          }
        }
      `,
      variables: {
        name: 'Peaky Blinders',
      },
    });

    expect(data.getSerieByName).toStrictEqual({
      __typename: 'Serie',
      name: 'Peaky Blinders',
      seasons: 5,
      status: 'FINISHED',
      platforms: ['NETFLIX'],
    });
  });
});
