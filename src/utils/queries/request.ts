import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query Requests($params: ParamsArgs!) {
    requests(params: $params) {
      items {
        _id
        subject
        message
        email
        replied
      }
      total
    }
  }
`;

export const GET_REQUEST = gql`
  query Request($id: String!) {
    request(id: $id) {
      _id
      subject
      message
      email
      replied
    }
  }
`;
