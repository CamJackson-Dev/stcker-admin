import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($params: ParamsArgs!) {
    products(params: $params) {
      items {
        _id
        image
        name
        price
      }
      total
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      _id
      image
      name
      price
    }
  }
`;

export const GET_PRODUCT_PRESIGNED_URL = gql`
  query GetProductPresignedUrl($id: String) {
    getProductPresignedUrl(id: $id)
  }
`;
