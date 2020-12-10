export {
  ApolloProvider,
  useApolloClient,
  useQuery,
  useMutation,
  useLazyQuery,
} from "@apollo/client";
export { ApolloLink, split } from "@apollo/client/link/core";
import { HttpLink } from "@apollo/client/link/http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "isomorphic-fetch";
import { ApolloClient } from "@apollo/client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { ApolloLink } from "apollo-link";

import gql from "graphql-tag";
const httpLink = new HttpLink({
  uri: "http://sites.costar.com:5000/graphql",
  credentials: "same-origin",
  fetch,
});
const link = HttpLink.from([httpLink]);
// const http = new HttpLink({ uri: "http://sites.costar.com:4000/" });
// const delay = setContext(
//   (request) =>
//     new Promise((success, fail) => {
//       setTimeout(() => {
//         success();
//       }, 800);
//     })
// );
//const link = ApolloLink.from([http]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
