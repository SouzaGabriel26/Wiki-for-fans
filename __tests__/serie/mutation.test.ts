import { gql } from '@apollo/client';

import { client } from '../../src/lib/clientApi';
import prisma from '../../src/lib/prismaClient';

beforeEach(async () => {
  await prisma.serie.deleteMany();
});

describe('> Serie schema (mutations)', () => {
  test('Trying to create a serie', async () => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation (
          $name: String!
          $description: String!
          $episodes: Int!
          $platforms: [String]!
          $seasons: Int!
          $status: Status!
        ) {
          createSerie(
            name: $name
            description: $description
            episodes: $episodes
            platforms: $platforms
            seasons: $seasons
            status: $status
          ) {
            name
            status
          }
        }
      `,
      variables: {
        name: 'Breaking Bad',
        description: 'A high school chemistry teacher turned meth maker',
        episodes: 62,
        platforms: ['NETFLIX'],
        seasons: 5,
        status: 'FINISHED',
      },
    });

    expect(data.createSerie).toStrictEqual({
      __typename: 'Serie',
      name: 'Breaking Bad',
      status: 'FINISHED',
    });
  });

  test('Trying to update a serie', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'Breaking Bad',
        description: 'A high school chemistry teacher turned meth maker',
        episodes: 62,
        platforms: {
          set: ['NETFLIX'],
        },
        seasons: 5,
        status: 'FINISHED',
      },
    });

    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!, $name: String, $status: Status) {
          updateSerieById(id: $id, name: $name, status: $status) {
            name
            status
          }
        }
      `,
      variables: {
        id: createdSerie.id,
        name: 'Breaking Bad - Updated',
        status: 'CANCELED',
      },
    });

    expect(data.updateSerieById).toStrictEqual({
      name: 'Breaking Bad - Updated',
      status: 'CANCELED',
      __typename: 'Serie',
    });
  });

  test('Trying to delete a serie', async () => {
    const createdSerie = await prisma.serie.create({
      data: {
        name: 'Breaking Bad',
        description: 'A high school chemistry teacher turned meth maker',
        episodes: 62,
        platforms: {
          set: ['NETFLIX'],
        },
        seasons: 5,
        status: 'FINISHED',
      },
    });

    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deleteSerieById(id: $id) {
            name
            status
          }
        }
      `,
      variables: {
        id: createdSerie.id,
      },
    });

    expect(data.deleteSerieById).toStrictEqual({
      name: 'Breaking Bad',
      status: 'FINISHED',
      __typename: 'Serie',
    });

    const series = await prisma.serie.findMany();

    expect(series).toStrictEqual([]);
  });
});
