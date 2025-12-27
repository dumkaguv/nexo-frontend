import { LocalStorage } from '@/config'

import { dispatchAuthTokenChanged } from './authTokenEvents'

export const clearAccessToken = () => {
  localStorage.removeItem(LocalStorage.token)
  dispatchAuthTokenChanged(null)
}
