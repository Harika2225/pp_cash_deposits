import { gql } from "@apollo/client";

export const GET_USER_ACCESSIBLE_ENTITIES = gql`
  query GetUserAccessibleEntities($user_id: bigint!) {
    user_accessible_entities(
      where: {
        _and: [
          { user_id: { _eq: $user_id } }
          { entity_type: { _eq: "Market" } }
          { deleted_at: { _is_null: true } }
        ]
      }
    ) {
      entity_id
      entity_type
    }
  }
`;
