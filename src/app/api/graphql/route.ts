import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { createContext } from '@/graphql/context';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export { handler as GET, handler as POST };
