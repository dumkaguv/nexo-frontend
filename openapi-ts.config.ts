import path from 'path'

import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

const API_URL_SWAGGER = 'http://localhost:3000/swagger.json'

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
    path: path.resolve(__dirname, 'src/api')
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
