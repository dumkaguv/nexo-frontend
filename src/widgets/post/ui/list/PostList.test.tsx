import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { PostList } from './PostList'

import type { ReactNode } from 'react'

const mockUseInfiniteQuery = vi.fn()

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>()

  return {
    ...actual,
    useInfiniteQuery: (options: unknown) => mockUseInfiniteQuery(options)
  }
})

vi.mock('@/shared/api', () => ({
  postsControllerFindAllInfiniteOptions: () => ({})
}))

vi.mock('./PostCard', () => ({
  PostCard: ({ post }: { post: { id: string } }) => (
    <div data-testid="post-card">{post.id}</div>
  )
}))

vi.mock('./PostListSkeleton', () => ({
  PostListSkeleton: ({ className }: { className?: string }) => (
    <div data-testid="post-skeleton" className={className} />
  )
}))

vi.mock('react-infinite-scroll-component', () => ({
  default: ({
    children,
    next,
    hasMore,
    loader,
    dataLength
  }: {
    children: ReactNode
    next: () => void
    hasMore: boolean
    loader: ReactNode
    dataLength: number
  }) => (
    <div
      data-testid="infinite-scroll"
      data-has-more={String(hasMore)}
      data-length={dataLength}
    >
      <button type="button" onClick={next} data-testid="load-more">
        load more
      </button>
      {children}
      {loader}
    </div>
  )
}))

describe('PostList', () => {
  beforeEach(() => {
    mockUseInfiniteQuery.mockReset()
  })

  it('renders skeleton while loading', () => {
    mockUseInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: vi.fn(),
      hasNextPage: false
    })

    render(<PostList />)

    expect(screen.getByTestId('post-skeleton')).toBeInTheDocument()
  })

  it('renders posts and passes infinite scroll props', () => {
    const posts = [{ id: 'post-1' }, { id: 'post-2' }]

    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [{ data: posts, nextPage: 2 }]
      },
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: true
    })

    render(<PostList />)

    expect(screen.getAllByTestId('post-card')).toHaveLength(2)

    const infiniteScroll = screen.getByTestId('infinite-scroll')

    expect(infiniteScroll).toHaveAttribute('data-has-more', 'true')
    expect(infiniteScroll).toHaveAttribute('data-length', '2')
  })

  it('calls fetchNextPage when load more is triggered', async () => {
    const user = userEvent.setup()
    const fetchNextPage = vi.fn()

    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [{ data: [{ id: 'post-1' }], nextPage: 2 }]
      },
      isLoading: false,
      fetchNextPage,
      hasNextPage: true
    })

    render(<PostList />)

    await user.click(screen.getByTestId('load-more'))

    expect(fetchNextPage).toHaveBeenCalledTimes(1)
  })
})
