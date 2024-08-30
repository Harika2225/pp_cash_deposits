import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_HASURA_GRAPHQL,
  }),
  cache: new InMemoryCache(),
});

export default client;
