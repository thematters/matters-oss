const fs = require('fs')
const path = require('path')
const { generateTypeScriptTypes } = require('graphql-schema-typescript')

const source = path.join(__dirname, '..', 'schema.gql')
const output = path.join(__dirname, '..', 'src/definitions/schema.d.ts')

const schema = fs.readFileSync(source, { encoding: 'utf8' })

generateTypeScriptTypes(schema, output, {
  contextType: 'Context',
  importStatements: ["import { Context } from './index'"],
  noStringEnum: true,
})
  .then(() => {
    console.log('DONE')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    console.error(err)
    process.exit(1)
  })
