import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { createContext } from '@/app/api/configs/context';
import { resolvers } from '@/app/api/configs/resolvers';
import { typeDefs } from '@/app/api/configs/schema';

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export { handler as GET, handler as POST };
