import prisma from '@/lib/prismaClient';

async function getAllSeries() {
  return await prisma.serie.findMany({
    include: {
      characters: true,
    },
  });
}

async function getAllCharacters() {
  return await prisma.characters.findMany({
    include: {
      serie: true,
    },
  });
}

async function getSerieByName(name: string) {
  return await prisma.serie.findUnique({
    where: {
      name,
    },
    include: {
      characters: true,
    },
  });
}

async function getSerieById(id: string) {
  return await prisma.serie.findUnique({
    where: {
      id,
    },
    include: {
      characters: true,
    },
  });
}

async function getCharacterById(id: string) {
  return await prisma.characters.findUnique({
    where: {
      id,
    },
    include: {
      serie: true,
    },
  });
}

async function getCharactersBySerieId(serieId: string) {
  return await prisma.characters.findMany({
    where: {
      serieId,
    },
    include: {
      serie: true,
    },
  });
}

export const queries = Object.freeze({
  getAllSeries,
  getAllCharacters,
  getSerieByName,
  getSerieById,
  getCharacterById,
  getCharactersBySerieId,
});

export type QueriesType = typeof queries;
