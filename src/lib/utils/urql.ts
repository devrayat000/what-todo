import {
  createClient,
  subscriptionExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  debugExchange,
  errorExchange,
  ssrExchange,
} from 'urql'
import { createClient as createWSClient } from 'graphql-ws'
import { SSRData } from '@urql/core/dist/types/exchanges/ssr'

const isServerSide = (() => typeof window === 'undefined')()

// The `ssrExchange` must be initialized with `isClient` and `initialState`
export const ssr = ssrExchange({
  isClient: !isServerSide,
  // initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

const wsClient = createWSClient({
  url: 'ws://localhost:3001/api/graphql',
})

const client = createClient({
  url: 'http://localhost:3001/api/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssr,
    errorExchange({
      onError(error) {
        console.error(error)
      },
    }),
    debugExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => ({
        subscribe: sink => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
})

export default client

// declare global {
//   interface Window {
//     __URQL_DATA__?: SSRData
//   }
// }
