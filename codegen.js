const {
  generateCode,
  loadSchemaFiles,
  writeGeneratedCode,
} = require('mercurius-codegen')
const buildSchema = require('graphql').buildSchema

;(async () => {
  const { schema } = loadSchemaFiles('src/graphql/**/*.{graphql,gql}', {
    // watchOptions: {
    //   enabled: true,
    //   onChange: writeCode,
    // },
  })

  await writeCode(schema)
  console.log('Generated types')
})()

/**
 *
 * @param {Array<string>} schema
 */
async function writeCode(schema) {
  const code = await generateCode(buildSchema(schema.join('\n')), {
    resolverTypeWrapperSignature:
      'Promise<T> | T | (() => Promise<T>) | (() => T)',
    inputMaybeValue: 'T | undefined',
    declarationKind: {
      type: 'interface',
      input: 'interface',
      interface: 'interface',
      arguments: 'interface',
    },
    // namingConvention: {
    //   typeNames: "keep",
    //   enumValues: "change-case-all#constantCase",
    // },
    // enumValues: {
    //   ProjectsBy: { TITLE: 'title', CREATED_AT: 'created_at' },
    //   ImagesBy: {
    //     NAME: 'name',
    //     ALT_TEXT: 'alt_text',
    //     CREATED_AT: 'created_at',
    //   },
    // },
    scalars: {
      Date: 'Date',
    },
  })

  await writeGeneratedCode({ code, targetPath: './src/graphql/generated.ts' })
}
