import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLClient } from "graphql-request";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URI;

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authorization");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// contenful connection
export const contentfulClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
  },
});

// API connection
export const swrClient = (query) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("authorization");

    const graphQLClient = new GraphQLClient(API_ENDPOINT, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    return graphQLClient.request(query);
  }
};

export default client;
