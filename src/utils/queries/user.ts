import gql from "graphql-tag";

export const GET_CUSTOMERS = gql`
  query Customers($params: ParamsArgs!) {
    customers(params: $params) {
      items {
        _id
        email
        firstname
        lastname
        isEmailVerified
        createdAt
      }
      total
    }
  }
`;

export const GET_CUSTOMER = gql`
  query Customer($id: String!) {
    customer(id: $id) {
      _id
      email
      firstname
      lastname
      isEmailVerified
      createdAt
    }
  }
`;

export const GET_AUTH_USER = gql`
  query AuthUser {
    me {
      _id
      firstname
      lastname
    }
  }
`;
