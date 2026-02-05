import { Providers } from '@/app/providers'
import { client } from '@/shared/api/client.gen'

import '@/shared/assets/styles/styles.css'

import { getConfigInterceptors } from '@/shared/lib/api/axios'

client.setConfig({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL as string | undefined,
  withCredentials: true
})

getConfigInterceptors(client.instance)

export const App = () => {
  return <Providers />
}
