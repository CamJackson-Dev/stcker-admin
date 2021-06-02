import { gql } from "@apollo/client";

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password, asAdmin: true) {
      _id
      firstname
      lastname
      email
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($tokenId: String!) {
    googleLogin(tokenId: $tokenId, asAdmin: true) {
      _id
      firstname
      lastname
      email
    }
  }
`;
