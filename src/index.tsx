import "core-js/features/array/flat-map";
import "core-js/features/map";
import "core-js/features/promise";
import "core-js/features/set";
import "raf/polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://news-reader.stagnationlab.dev/graphql",
  cache: new InMemoryCache(),
});
import { ApolloProvider } from "@apollo/client/react";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
