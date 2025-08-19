export const defineHeaderHeightCssVar = () => {
  const header = document.querySelector<HTMLElement>('header')
  if (!header) return

  const height = header.offsetHeight
  document.documentElement.style.setProperty('--header-height', `${height}px`)
}
