declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const schema: DocumentNode
  export default schema
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const schema: DocumentNode
  export default schema
}
