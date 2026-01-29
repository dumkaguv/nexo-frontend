import path from 'path'

import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

const API_URL_SWAGGER = 'http://localhost:3000/swagger.json'
const FOLDER_GENERATED_API = 'src/shared/api'

export default defineConfig({
  input: {
    filters: {
      deprecated: false
    },
    path: API_URL_SWAGGER
  },

  output: {
    format: 'prettier',
    lint: 'eslint',
    path: path.resolve(__dirname, FOLDER_GENERATED_API)
  },

  plugins: [
    ...defaultPlugins,
    '@hey-api/client-axios',
    {
      exportFromIndex: true,
      name: '@tanstack/react-query'
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript'
    }
  ]
})
