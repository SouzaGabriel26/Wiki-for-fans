import { prisma } from '@/lib/prismaClient';

export const resolvers = {
  Query: {
    series: async () => await prisma.serie.findMany(),
    characters: async () => await prisma.characters.findMany(),
    getSerieByName: async (_: any, args: { name: string }) =>
      await prisma.serie.findUnique({
        where: {
          name: args.name,
        },
      }),
    getCharacterById: async (_: any, args: { id: string }) =>
      await prisma.characters.findUnique({
        where: {
          id: args.id,
        },
      }),
  },

  Mutation: {
    createSerie: async (_: any, args: any) =>
      await prisma.serie.create({
        data: {
          ...args,
        },
      }),
    createCharacter: async (_: any, args: any) =>
      await prisma.characters.create({
        data: {
          ...args,
        },
      }),
  },
};
