import { LocalStorage } from '@/config'

export const getAccessToken = () => localStorage.getItem(LocalStorage.token)
