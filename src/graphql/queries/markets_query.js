import { gql } from "@apollo/client";

export const GET_MARKETS = gql`
  query GetMarkets {
    markets(
      where: { deleted_at: { _is_null: true } }
      order_by: { name: asc }
    ) {
      name
      id
      visible
    }
  }
`;

export const GET_USER_MARKETS = gql`
  query GetMarkets($marketIds: [Int!]) {
    markets(
      where: { id: { _in: $marketIds }, deleted_at: { _is_null: true } }
      order_by: { name: asc }
    ) {
      name
      id
      visible
    }
  }
`;
