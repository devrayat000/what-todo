import resolvers from '../graphql/resolvers'
import { FastifyInstance } from 'fastify'
import { buildSchema } from 'graphql'
import codegenMercurius, { loadSchemaFiles } from 'mercurius-codegen'
import { makeExecutableSchema } from '@graphql-tools/schema'
export async function getLoadedSchema(fastify: FastifyInstance) {
  // if (process.env.NODE_ENV !== "production") {
  const { schema } = loadSchemaFiles('src/graphql/**/*.graphql', {
    watchOptions: {
      enabled: process.env.NODE_ENV !== 'production',
      onChange(schema) {
        fastify.graphql.replaceSchema(buildSchema(schema.join('\n')))
        fastify.graphql.defineResolvers(resolvers)

        codegenMercurius(fastify, {
          targetPath: './src/graphql/generated.ts',
          operationsGlob: './src/graphql/**/*.graphql',
        }).catch(fastify.log.error)
      },
    },
  })

  return schema
}

export default async function getSchema(fastify: FastifyInstance) {
  if (process.env.NODE_ENV !== 'production') {
    const typeDefs = await getLoadedSchema(fastify)
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolvers as any,
    })
    return schema
  } else {
    const { default: typeDefs } = await import('$graphql/schema.graphql')
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolvers as any,
    })
    return schema
  }
}
