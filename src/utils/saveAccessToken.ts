import { LocalStorage } from "@/config";

export const saveAccessToken = (token: string) =>
  localStorage.setItem(LocalStorage.token, token);
