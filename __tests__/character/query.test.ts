import { gql } from '@apollo/client';

import { client } from '../../src/lib/clientApi';
import prisma from '../../src/lib/prismaClient';

let serieId: string;

beforeEach(async () => {
  await prisma.serie.deleteMany();

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

  serieId = peakyBlinders.id;

  await prisma.characters.create({
    data: {
      name: 'Tommy Shelby',
      age: 32,
      description: 'Leader of the Peaky Blinders',
      isProtagonist: true,
      serie: {
        connect: {
          id: peakyBlinders.id,
        },
      },
    },
  });
});

describe('> Character schema (Query)', () => {
  test('Trying to get all characters', async () => {
    const { data } = await client.query({
      query: gql`
        query {
          characters {
            name
            age
            description
            isProtagonist
            serie {
              name
            }
          }
        }
      `,
    });

    expect(data.characters).toStrictEqual([
      {
        __typename: 'Character',
        name: 'Tommy Shelby',
        age: 32,
        description: 'Leader of the Peaky Blinders',
        isProtagonist: true,
        serie: {
          __typename: 'Serie',
          name: 'Peaky Blinders',
        },
      },
    ]);
  });
  test('Trying to get character by id', async () => {
    const createdCharacter = await prisma.characters.create({
      data: {
        name: 'Arthur Shelby',
        nickName: 'Arthur',
        description:
          'Arthur Shelby Jr. is the eldest Shelby sibling, tough, responsible, and a prominent member of the Peaky Blinders.',
        age: 45,
        isProtagonist: true,
        serie: {
          connect: {
            id: serieId,
          },
        },
      },
    });

    const savedCharacters = await prisma.characters.findMany();

    expect(savedCharacters).toHaveLength(2);

    const { data } = await client.query({
      query: gql`
        query ($id: ID!) {
          getCharacterById(id: $id) {
            name
            nickName
            description
            age
            isProtagonist
            serie {
              name
            }
          }
        }
      `,
      variables: {
        id: createdCharacter.id,
      },
    });

    expect(data.getCharacterById).toStrictEqual({
      __typename: 'Character',
      name: 'Arthur Shelby',
      nickName: 'Arthur',
      description:
        'Arthur Shelby Jr. is the eldest Shelby sibling, tough, responsible, and a prominent member of the Peaky Blinders.',
      age: 45,
      isProtagonist: true,
      serie: {
        __typename: 'Serie',
        name: 'Peaky Blinders',
      },
    });
  });
});
