import { InputSearch } from '@/components/shared'
import { useHeader } from '@/hooks'

export const HeaderSearch = () => {
  const { searchValue, setSearchValue } = useHeader()

  return (
    <InputSearch
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      className="w-[400px]"
    />
  )
}
