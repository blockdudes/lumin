import { createThirdwebClient } from "thirdweb";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
<<<<<<< HEAD
import { NormalizedCacheObject, HttpLink, ApolloLink } from '@apollo/client'
=======
>>>>>>> e5c8a9d37ed1edd31d0b51cb698b65d9f721704a

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});


const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL,
  fetch: function (uri, options) {
    return fetch(uri, {
      ...options ?? {},
      headers: {
        ...options?.headers ?? {},
      },
      next: {
        revalidate: 0
      }
    })
  }
})
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

