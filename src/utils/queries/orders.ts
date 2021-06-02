import { gql } from "@apollo/client";
import {
  ADDRESS_FRAGMENT,
  ORDER_FRAGMENT,
  ORDER_ITEM_FRAGMENT,
} from "../fragments/order";

export const GET_ORDERS = gql`
  query Orders($params: ParamsArgs!) {
    orders(params: $params) {
      items {
        ...OrderFragment
        items {
          ...OrderItemFragment
        }
        shippingDetails {
          ...AddressFragment
        }
      }
      total
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
`;

export const GET_ORDER = gql`
  query Order($id: String!) {
    order(id: $id) {
      ...OrderFragment
      items {
        ...OrderItemFragment
      }
      shippingDetails {
        ...AddressFragment
      }
    }
  }
  ${ORDER_FRAGMENT}
  ${ORDER_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
`;
