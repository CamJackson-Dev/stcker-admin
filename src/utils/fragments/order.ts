import { gql } from "@apollo/client";

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFragment on Address {
    address
    city
    country
    postalCode
    phoneNumber
    state
    fullname
    email
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    _id
    createdAt
    grossAmount
    payPalFee
    paymentStatus
    orderStatus
  }
`;

export const ORDER_ITEM_FRAGMENT = gql`
  fragment OrderItemFragment on OrderItem {
    _id
    name
    quantity
    price
  }
`;
