import { ApolloClient, FetchPolicy, InMemoryCache } from "@apollo/client";
import { Product } from "./types/product";

export function createApolloClient(fetchPolicy: FetchPolicy) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    uri: process.env.REACT_APP_GRAPHQL_API_URL,
    defaultOptions: {
      query: {
        fetchPolicy,
      },
    },
  });
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: string,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function filterProducts(products: Product[], search: string) {
  const splitSearchString = search.toLowerCase().split(" ");

  return products.filter((product) => {
    const callback = (string: string) =>
      product.name.toLowerCase().includes(string);
    return splitSearchString.some(callback);
  });
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}
