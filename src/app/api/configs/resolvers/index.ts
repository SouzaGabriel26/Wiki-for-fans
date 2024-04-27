import { Context } from '../context';
import {
  CreateCharacterArgs,
  CreateSerieArgs,
  UpdateCharacterArgs,
  UpdateSerieArgs,
} from '../context/prismaMutations';

export const resolvers = {
  Query: {
    series: async (_parent: any, _args: any, context: Context) =>
      await context.queries.getAllSeries(),

    characters: async (_parent: any, _args: any, context: Context) =>
      await context.queries.getAllCharacters(),

    getSerieByName: async (
      _parent: any,
      args: { name: string },
      context: Context,
    ) => await context.queries.getSerieByName(args.name),

    getSerieById: async (
      _parent: any,
      args: { id: string },
      context: Context,
    ) => await context.queries.getSerieById(args.id),

    getCharacterById: async (
      _parent: any,
      args: { id: string },
      context: Context,
    ) => await context.queries.getCharacterById(args.id),

    getCharactersBySerieId: async (
      _parent: any,
      args: { serieId: string },
      context: Context,
    ) => await context.queries.getCharactersBySerieId(args.serieId),
  },

  Mutation: {
    createSerie: async (
      _parent: any,
      args: CreateSerieArgs,
      context: Context,
    ) => {
      return await context.mutations.createSerie(args);
    },

    createCharacter: async (
      _parent: any,
      args: CreateCharacterArgs,
      context: Context,
    ) => await context.mutations.createCharacter(args),

    updateSerieById: async (
      _parent: any,
      args: UpdateSerieArgs,
      context: Context,
    ) => await context.mutations.updateSerieById(args),

    updateCharacterById: async (
      _parent: any,
      args: UpdateCharacterArgs,
      context: Context,
    ) => await context.mutations.updateCharacterById(args),

    deleteCharacterById: async (
      _parent: any,
      args: { id: string },
      context: Context,
    ) => await context.mutations.deleteCharacterById(args.id),

    deleteSerieById: async (
      _parent: any,
      args: { id: string },
      context: Context,
    ) => await context.mutations.deleteSerieById(args.id),
  },
};
