export const getTextColorForBackground = (hslColor: string) => {
  const match = hslColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!match) {
    return '#fff'
  }

  const [, , , lStr] = match
  const lightness = parseInt(lStr, 10)

  return lightness > 60 ? '#000' : '#fff'
}

export const stringToColor = (str: string) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash) % 360

  return `hsl(${hue}, 65%, 60%)`
}
