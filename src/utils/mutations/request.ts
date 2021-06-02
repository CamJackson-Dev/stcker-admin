import { gql } from "@apollo/client";

export const DELETE_REQUEST = gql`
  mutation DeleteRequest($id: String!) {
    deleteRequest(id: $id)
  }
`;

export const DELETE_REQUESTS = gql`
  mutation DeleteRequests($ids: [String!]!) {
    deleteRequests(ids: $ids)
  }
`;

export const REPLY_REQUEST = gql`
  mutation ReplyRequest($params: ReplyInput!) {
    replyRequest(params: $params)
  }
`;
