import path from 'path'

import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: {
    filters: {
      deprecated: false
    },
    path: 'http://localhost:3000/swagger.json'
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
