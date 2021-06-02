import { DocumentNode } from "@apollo/client";
import { DataProvider } from "ra-core";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_PRESIGNED_URL,
} from "../utils/queries/product";
import { GET_CUSTOMER, GET_CUSTOMERS } from "../utils/queries/user";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../utils/mutations/product";
import { createApolloClient } from "../utils/helpers";
import { GET_ORDER, GET_ORDERS } from "../utils/queries/orders";
import { UPDATE_ORDER } from "../utils/mutations/order";
import { GET_REQUEST, GET_REQUESTS } from "../utils/queries/request";
import {
  DELETE_REQUEST,
  DELETE_REQUESTS,
  REPLY_REQUEST,
} from "../utils/mutations/request";

const client = createApolloClient("network-only");

type ResourceKey = "customers" | "orders" | "products" | "requests";

interface ResourceMap {
  getList: DocumentNode;
  getOne: DocumentNode;
  delete?: DocumentNode;
}

const resources: Record<ResourceKey, ResourceMap> = {
  customers: {
    getList: GET_CUSTOMERS,
    getOne: GET_CUSTOMER,
  },
  products: {
    getList: GET_PRODUCTS,
    getOne: GET_PRODUCT,
    delete: DELETE_PRODUCT,
  },
  requests: {
    getList: GET_REQUESTS,
    getOne: GET_REQUEST,
    delete: DELETE_REQUEST,
  },
  orders: {
    getList: GET_ORDERS,
    getOne: GET_ORDER,
  },
};

export default {
  create: async (resource, params) => {
    if ((resource as ResourceKey) === "products") {
      const { id, image } = await uploadImage(params);

      const { name, price } = params.data;
      const product = { id, image, name, price };

      await client.mutate({
        mutation: CREATE_PRODUCT,
        variables: { params: product },
      });

      return { data: product, validUntil: getValidUntil(15 * 60 * 1000) };
    }
    throw new Error("Cannot perform operation on this resource");
  },
  delete: async (resource, params) => {
    if (["products", "requests"].includes(resource)) {
      await client.mutate({
        mutation: resources[resource as ResourceKey].delete!,
        variables: { id: params.id },
      });
      return { data: params.previousData };
    }
    throw new Error("Cannot perform operation on this resource");
  },
  deleteMany: async (resource, { ids }) => {
    if ((resource as ResourceKey) === "requests") {
      await client.mutate({
        mutation: DELETE_REQUESTS,
        variables: { ids },
      });
      return { data: ids };
    }

    throw new Error("Cannot perform operation on this resource");
  },
  getList: async (resource, { pagination, sort }) => {
    if (!Object.keys(resources).includes(resource)) {
      throw new Error("Cannot perform operation on this resource");
    }

    const { data } = await client.query({
      query: resources[resource as ResourceKey].getList,
      variables: { params: { pagination, sort } },
    });

    return {
      data: data[resource].items.map((item: any) => ({
        ...item,
        id: item._id,
      })),
      total: data[resource].total,
      validUntil: getValidUntil(15 * 60 * 1000),
    };
  },
  getOne: async (resource, { id }) => {
    if (!Object.keys(resources).includes(resource)) {
      throw new Error("Cannot perform operation on this resource");
    }

    const { data } = await client.query({
      query: resources[resource as ResourceKey].getOne,
      variables: { id },
    });
    return {
      data: { ...data[singular(resource)], id: data[singular(resource)]._id },
      validUntil: getValidUntil(15 * 60 * 1000),
    };
  },
  update: async (resource, params) => {
    const { data, id, previousData } = params;

    let resourceKey = resource as ResourceKey;
    if (resourceKey === "products") {
      let image = previousData.image;
      if (data.image) {
        const result = await uploadImage(params);
        image = result.image;
      }

      const { name, price } = data;
      const product = { id, image, name, price };

      await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: { params: product },
      });

      return { data: product, validUntil: getValidUntil(15 * 60 * 1000) };
    }

    if (resourceKey === "orders") {
      const { orderStatus, paymentStatus } = data;
      await client.mutate({
        mutation: UPDATE_ORDER,
        variables: { params: { id, orderStatus, paymentStatus } },
      });

      return { data, validUntil: getValidUntil(15 * 60 * 1000) };
    }

    if (resourceKey === "requests") {
      const { reply } = data;
      await client.mutate({
        mutation: REPLY_REQUEST,
        variables: { params: { id, message: reply } },
      });
      return {
        data: { ...previousData, replied: true },
        validUntil: getValidUntil(15 * 60 * 1000),
      };
    }
    throw new Error("Cannot perform operation on this resource");
  },
} as DataProvider;

async function uploadImage(params: any) {
  let id = params.id as string;

  const { data } = await client.query({
    query: GET_PRODUCT_PRESIGNED_URL,
    variables: id ? { id } : undefined,
  });

  const url = data.getProductPresignedUrl as string;
  const image = url.split("?")[0];
  id = image.slice(-24);

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
    },
    body: params.data.image.rawFile,
  });

  return {
    image,
    id,
  };
}

function singular(value: string) {
  return value.slice(0, -1);
}

function getValidUntil(durationInMilliSeconds: number) {
  const validUntil = new Date();
  validUntil.setTime(validUntil.getTime() + durationInMilliSeconds);
  return validUntil;
}
