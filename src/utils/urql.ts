import { createClient, subscriptionExchange, defaultExchanges } from 'urql'
import { createClient as createWSClient } from 'graphql-ws'

const wsClient = createWSClient({
  url: 'ws://localhost:3001/api/graphql',
})

const client = createClient({
  url: 'http://localhost:3001/api/graphql',
  exchanges: [
    ...defaultExchanges,
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
