import { prisma } from '@/lib/prismaClient';

async function getAllSeries() {
  return await prisma.serie.findMany({
    include: {
      characters: true,
    },
  });
}

async function getAllCharacters() {
  return await prisma.characters.findMany();
}

async function getSerieByName(name: string) {
  return await prisma.serie.findUnique({
    where: {
      name,
    },
  });
}

async function getCharacterById(id: string) {
  return await prisma.characters.findUnique({
    where: {
      id,
    },
  });
}

export const queries = Object.freeze({
  getAllSeries,
  getAllCharacters,
  getSerieByName,
  getCharacterById,
});

export type QueriesType = typeof queries;
