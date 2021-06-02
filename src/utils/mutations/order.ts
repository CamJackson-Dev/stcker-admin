import { gql } from "@apollo/client";

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($params: UpdateOrderInput!) {
    updateOrder(params: $params)
  }
`;
