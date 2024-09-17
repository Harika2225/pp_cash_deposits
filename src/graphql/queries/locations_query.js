import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations(where: { competitor: { _eq: false } }) {
      name
      id
      market_id
      deleted_at
    }
  }
`;

export const GET_MARKET_LOCATIONS = gql`
  query GetMarketLocations($marketIds: [Int!]!) {
    locations(
      where: {
        _and: [
          { market_id: { _in: $marketIds } }
          { competitor: { _eq: false } }
        ]
      }
    ) {
      name
      id
      market_id
      deleted_at
    }
  }
`;
