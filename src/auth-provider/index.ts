import { AuthProvider } from "ra-core";
import { createApolloClient } from "../utils/helpers";
import { GOOGLE_LOGIN, LOGIN_USER, LOGOUT_USER } from "../utils/mutations/auth";
import { GET_AUTH_USER } from "../utils/queries/user";

const client = createApolloClient("cache-first");

export default {
  login: async ({ email, password, tokenId }: any) => {
    await client.mutate({
      mutation: tokenId ? GOOGLE_LOGIN : LOGIN_USER,
      variables: tokenId ? { tokenId } : { email, password },
    });
  },
  logout: async () => {
    await client.mutate({ mutation: LOGOUT_USER });
  },
  checkError: (error) => {
    if (
      error?.message.toLowerCase().includes("forbidden") ||
      error?.message.toLowerCase().includes("unauthorized")
    ) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  getIdentity: async () => {
    const { data } = await client.query({ query: GET_AUTH_USER });
    if (!data?.me) return null;

    const { _id, firstname, lastname } = data.me;
    return {
      id: _id,
      fullName: `${firstname} ${lastname}`,
    };
  },
} as AuthProvider;
