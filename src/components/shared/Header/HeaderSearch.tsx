import { InputSearch } from '@/components/shared'
import { useHeader } from '@/hooks'

export const HeaderSearch = () => {
  const { usersSearch, searchValue, setSearchValue, isPendingSearch } =
    useHeader()

  return (
    <InputSearch
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      className="w-[400px]"
    />
  )
}
