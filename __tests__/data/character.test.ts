import { createCharacterDatasource } from '../../src/data/character';
import prisma from '../../src/lib/prismaClient';

let serieId: string = '';

beforeAll(async () => {
  await prisma.serie.deleteMany();
  const createdSerie = await prisma.serie.create({
    data: {
      name: 'Naruto',
      description: 'Naruto description',
      episodes: 220,
      seasons: 5,
      status: 'FINISHED',
    },
  });

  serieId = createdSerie.id;
});

afterAll(async () => {
  await prisma.serie.delete({
    where: {
      id: serieId,
    },
  });
});

describe('> data/character.ts - characterDataSource', () => {
  const characterDataSource = createCharacterDatasource();

  test('Calling "getAll" method', async () => {
    const firstCreatedCharacter = await prisma.characters.create({
      data: {
        name: 'Naruto',
        nickName: 'Naruto',
        age: 16,
        description: 'Naruto description',
        isProtagonist: true,
        serieId,
      },
    });

    const secondCreatedCharacter = await prisma.characters.create({
      data: {
        name: 'Sasuke',
        nickName: 'Sasuke',
        age: 16,
        description: 'Sasuke description',
        isProtagonist: false,
        serieId,
      },
    });

    const result = await characterDataSource.getAll();

    expect(result).toStrictEqual({
      error: undefined,
      returnedCharacters: [
        {
          __typename: 'Character',
          id: firstCreatedCharacter.id,
          name: firstCreatedCharacter.name,
          nickName: firstCreatedCharacter.nickName,
          image: null,
          serie: {
            __typename: 'Serie',
            name: 'Naruto',
          },
        },
        {
          __typename: 'Character',
          id: secondCreatedCharacter.id,
          name: secondCreatedCharacter.name,
          nickName: secondCreatedCharacter.nickName,
          image: null,
          serie: {
            __typename: 'Serie',
            name: 'Naruto',
          },
        },
      ],
    });
  });

  test('Calling "getById" method', async () => {
    const createdCharacter = await prisma.characters.create({
      data: {
        name: 'Test',
        age: 16,
        description: 'Test',
        isProtagonist: true,
        serieId,
      },
    });

    const result = await characterDataSource.getById(createdCharacter.id);

    expect(result).toStrictEqual({
      error: undefined,
      returnedCharacter: {
        __typename: 'Character',
        id: createdCharacter.id,
        name: createdCharacter.name,
        nickName: null,
        age: createdCharacter.age,
        createdAt: new Date(createdCharacter.createdAt!).getTime().toString(),
        description: createdCharacter.description,
        personalities: [],
        friends: [],
        enemies: [],
        favoritePhrase: null,
        image: null,
        imagePublicId: null,
        isProtagonist: true,
        serie: {
          __typename: 'Serie',
          name: 'Naruto',
          platforms: [],
          id: serieId,
        },
      },
    });
  });

  test('Calling "getAllBySerieId" method', async () => {
    await prisma.characters.deleteMany();

    const firstCreatedCharacter = await prisma.characters.create({
      data: {
        name: 'Naruto',
        nickName: 'Naruto',
        age: 16,
        description: 'Naruto description',
        isProtagonist: true,
        serieId,
      },
    });

    const secondCreatedCharacter = await prisma.characters.create({
      data: {
        name: 'Sasuke',
        nickName: 'Sasuke',
        age: 16,
        description: 'Sasuke description',
        isProtagonist: false,
        serieId,
      },
    });

    const result = await characterDataSource.getAllBySerieId(serieId);

    expect(result).toStrictEqual({
      error: undefined,
      returnedCharacters: [
        {
          __typename: 'Character',
          id: firstCreatedCharacter.id,
          name: firstCreatedCharacter.name,
          nickName: firstCreatedCharacter.nickName,
          image: null,
          serie: {
            __typename: 'Serie',
            name: 'Naruto',
          },
        },
        {
          __typename: 'Character',
          id: secondCreatedCharacter.id,
          name: secondCreatedCharacter.name,
          nickName: secondCreatedCharacter.nickName,
          image: null,
          serie: {
            __typename: 'Serie',
            name: 'Naruto',
          },
        },
      ],
    });
  });

  test('Calling "create" method', async () => {
    await characterDataSource.create({
      name: 'Test',
      age: 100,
      description: 'Test',
      enemies: [],
      friends: [],
      personalities: [],
      isProtagonist: true,
      serieId,
    });

    const character = await prisma.characters.findFirst({
      where: {
        age: 100,
      },
    });

    expect(character).toStrictEqual({
      id: character?.id,
      name: 'Test',
      nickName: null,
      age: 100,
      description: 'Test',
      personalities: [],
      friends: [],
      enemies: [],
      favoritePhrase: null,
      image: null,
      imagePublicId: null,
      isProtagonist: true,
      serieId,
      createdAt: character?.createdAt,
    });
  });

  test('Calling "deleteById" method', async () => {
    const createdCharacter = await prisma.characters.create({
      data: {
        name: 'Test',
        age: 200,
        description: 'Test',
        isProtagonist: true,
        serieId,
      },
    });

    expect(createdCharacter).not.toBeNull();

    await characterDataSource.deleteById(createdCharacter.id);

    const returnedCharacter = await prisma.characters.findFirst({
      where: {
        age: 200,
      },
    });

    expect(returnedCharacter).toBeNull();
  });

  test('Calling "updateById" method', async () => {
    const createdCharacter = await prisma.characters.create({
      data: {
        name: 'Test',
        age: 300,
        description: 'Test',
        isProtagonist: true,
        serieId,
      },
    });

    await characterDataSource.updateById(createdCharacter.id, {
      name: 'Updated name',
      age: createdCharacter.age + 1,
      description: 'Updated description',
      enemies: [],
      friends: [],
      personalities: [],
      isProtagonist: true,
      serieId,
    });

    const characterAfterUpdate = await prisma.characters.findFirst({
      where: {
        id: createdCharacter.id,
      },
    });

    expect(characterAfterUpdate).toStrictEqual({
      id: createdCharacter.id,
      name: 'Updated name',
      nickName: null,
      age: 301,
      description: 'Updated description',
      personalities: [],
      friends: [],
      enemies: [],
      favoritePhrase: null,
      image: null,
      imagePublicId: null,
      isProtagonist: true,
      createdAt: createdCharacter.createdAt,
      serieId,
    });
  });
});
