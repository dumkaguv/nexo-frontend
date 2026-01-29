import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ImagePreview } from '@/shared/ui'

vi.mock('yet-another-react-lightbox', () => ({
  default: ({ slides }: { slides: { src: string }[] }) => (
    <div data-testid="lightbox" data-count={slides.length} />
  )
}))

vi.mock('yet-another-react-lightbox/plugins/counter', () => ({
  default: {}
}))
vi.mock('yet-another-react-lightbox/plugins/fullscreen', () => ({
  default: {}
}))
vi.mock('yet-another-react-lightbox/plugins/thumbnails', () => ({
  default: {}
}))
vi.mock('yet-another-react-lightbox/plugins/zoom', () => ({
  default: {}
}))

describe('ImagePreview', () => {
  it('renders images from srcs', () => {
    const { container } = render(<ImagePreview srcs={['/a.png', '/b.png']} />)

    expect(container.querySelectorAll('img')).toHaveLength(2)
  })
})
