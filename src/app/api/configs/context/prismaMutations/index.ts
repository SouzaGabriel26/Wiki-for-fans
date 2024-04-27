import prisma from '@/lib/prismaClient';

export type CreateSerieArgs = {
  name: string;
  description: string;
  episodes: number;
  platforms: string[];
  seasons: number;
  status: 'FINISHED' | 'CANCELED' | 'IN_PROGRESS';
};

export type CreateCharacterArgs = {
  name: string;
  nickName?: string;
  description: string;
  age: number;
  personalities: string[];
  friends: string[];
  enemies: string[];
  image?: string;
  imagePublicId?: string;
  favoritePhrase?: string;
  isProtagonist: boolean;
  serieId: string;
};

export type UpdateSerieArgs = {
  id: string;
  name?: string;
  description?: string;
  episodes?: number;
  platforms?: string[];
  seasons?: number;
  status?: 'FINISHED' | 'CANCELED' | 'IN_PROGRESS';
};

export type UpdateCharacterArgs = {
  id: string;
  name?: string;
  nickName?: string;
  description?: string;
  age?: number;
  personalities?: string[];
  friends?: string[];
  enemies?: string[];
  image?: string;
  favoritePhrase?: string;
  isProtagonist?: boolean;
  serieId?: string;
};

async function createSerie(args: CreateSerieArgs) {
  return await prisma.serie.create({
    data: {
      ...args,
    },
  });
}

async function createCharacter(args: CreateCharacterArgs) {
  return await prisma.characters.create({
    data: {
      ...args,
    },
    include: {
      serie: true,
    },
  });
}

async function updateSerieById({ id, ...args }: UpdateSerieArgs) {
  return await prisma.serie.update({
    data: {
      ...args,
    },
    where: {
      id,
    },
  });
}

async function updateCharacterById({ id, ...args }: UpdateCharacterArgs) {
  return await prisma.characters.update({
    data: {
      ...args,
    },
    where: {
      id,
    },
  });
}

async function deleteCharacterById(id: string) {
  try {
    const deletedCharacter = await prisma.characters.delete({
      where: {
        id,
      },
      include: {
        serie: true,
      },
    });

    return deletedCharacter;
  } catch (error) {
    console.error(error);
  }
}

async function deleteSerieById(id: string) {
  try {
    const deletedSerie = await prisma.serie.delete({
      where: {
        id,
      },
      include: {
        characters: true,
      },
    });

    return deletedSerie;
  } catch (error) {
    console.error(error);
  }
}

export const mutations = Object.freeze({
  createSerie,
  createCharacter,
  updateSerieById,
  updateCharacterById,
  deleteCharacterById,
  deleteSerieById,
});

export type MutationsType = typeof mutations;
