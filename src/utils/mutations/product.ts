import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($params: ProductInput!) {
    createProduct(params: $params)
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($params: ProductInput!) {
    updateProduct(params: $params)
  }
`;
