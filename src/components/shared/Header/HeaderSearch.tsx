import { useState } from 'react'

import { InputSearch } from '@/components/shared'

export const HeaderSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <InputSearch
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      className="w-[400px]"
    />
  )
}
