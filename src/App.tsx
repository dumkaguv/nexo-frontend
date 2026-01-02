import '@/assets/styles/styles.css'

import { Providers, getConfigInterceptors } from '@/config'

import { client } from './api/client.gen'

client.setConfig({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true
})

getConfigInterceptors(client.instance)

export const App = () => <Providers />
