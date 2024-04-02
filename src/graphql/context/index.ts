import { mutations, MutationsType } from './prismaMutations';
import { queries, QueriesType } from './prismaQueries';

export type Context = {
  queries: QueriesType;
  mutations: MutationsType;
};

export async function createContext(): Promise<Context> {
  return {
    queries,
    mutations,
  };
}
