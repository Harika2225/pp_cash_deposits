import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HASURA_GRAPHQL,
});

const authLink = setContext((_, { headers }) => {
  console.log('GraphQL Endpoint:', process.env.REACT_APP_HASURA_GRAPHQL);
  console.log('Admin Secret:', process.env.REACT_APP_HASURA_ADMIN_SECRET);

  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
