export const AUTH_TOKEN_CHANGED_EVENT = 'auth:token-changed'

export const dispatchAuthTokenChanged = (token: string | null) => {
  window.dispatchEvent(
    new CustomEvent(AUTH_TOKEN_CHANGED_EVENT, {
      detail: token
    })
  )
}
