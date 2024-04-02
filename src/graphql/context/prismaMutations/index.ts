import { prisma } from '@/lib/prismaClient';

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
  nickNamea?: string;
  description: string;
  age: number;
  personalities: string[];
  friends: string[];
  enemies: string[];
  favoritePhrase?: string;
  isProtagonist: boolean;
  serieId: string;
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
  });
}

export const mutations = Object.freeze({
  createSerie,
  createCharacter,
});

export type MutationsType = typeof mutations;
