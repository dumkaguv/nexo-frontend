import '@/assets/styles/styles.css'
import 'yet-another-react-lightbox/styles.css'
import { Providers } from '@/config'

import { client } from './api/client.gen'
import { getConfigInterceptors } from './config'

client.setConfig({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL
})

getConfigInterceptors(client.instance)

export const App = () => {
  return <Providers />
}
