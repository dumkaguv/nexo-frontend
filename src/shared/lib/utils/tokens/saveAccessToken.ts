import { LocalStorage } from '@/shared/config'

import { dispatchAuthTokenChanged } from './authTokenEvents'

export const saveAccessToken = (token: string) => {
  localStorage.setItem(LocalStorage.token, token)
  dispatchAuthTokenChanged(token)
}
