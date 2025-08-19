export const getFileType = (src: string) => {
  const types = ['video', 'image'] as const

  return types.find((type) => src.includes(type))
}
