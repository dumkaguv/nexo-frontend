import { LocalStorage } from '@/shared/config'

export const getAccessToken = () => localStorage.getItem(LocalStorage.token)
