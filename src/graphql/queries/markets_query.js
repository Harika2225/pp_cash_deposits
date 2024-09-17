import { gql } from "@apollo/client";

export const GET_MARKETS = gql`
  query GetMarkets {
    markets {
      name
      id
      visible
    }
  }
`;

export const GET_USER_MARKETS = gql`
  query GetMarkets($marketIds: [Int!]) {
    markets(where: { id: { _in: $marketIds } }) {
      name
      id
      visible
    }
  }
`;
