import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const API_URL =
  process.env.NODE_ENV == 'production'
    ? '/api/graphql'
    : 'http://localhost:3000/api/graphql';

const httpLink = createHttpLink({
  uri: API_URL,
});

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  link: httpLink,
});
