import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { HeaderSearch } from '@/components/shared/Header/HeaderSearch'

import type { ReactNode } from 'react'

vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: () => ({
    data: undefined,
    isLoading: true,
    fetchNextPage: vi.fn(),
    hasNextPage: false
  })
}))

vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

vi.mock('@/api', () => ({
  userControllerFindAllInfiniteOptions: () => ({})
}))

vi.mock('@/hooks', () => ({
  useDebouncedValue: (value: string) => value
}))

vi.mock('@/hooks/useQueryUpdate', () => ({
  useQueryUpdate: () => ({ updateQuery: vi.fn(), params: {} })
}))

describe('HeaderSearch', () => {
  it('renders search input and loading indicator', () => {
    render(
      <MemoryRouter>
        <HeaderSearch />
      </MemoryRouter>
    )

    expect(screen.getByPlaceholderText('usersSearch...')).toBeInTheDocument()
    expect(screen.getByText('loading')).toBeInTheDocument()
  })
})
