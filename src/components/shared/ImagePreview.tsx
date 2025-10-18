import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  file?: File
  src?: string
  files?: File[]
  srcs?: string[]
  className?: string
} & ComponentProps<'img'>

export const ImagePreview = ({
  file,
  src,
  files,
  srcs,
  className,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useTranslation()

  const slides = useMemo(() => {
    if (files?.length)
      return files.map((f) => ({ src: URL.createObjectURL(f) }))
    if (srcs?.length) return srcs.map((s) => ({ src: s }))
    if (file) return [{ src: URL.createObjectURL(file) }]
    if (src) return [{ src }]
    return []
  }, [file, src, files, srcs])

  if (!slides.length) return null

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {slides.map((slide, index) => (
          <Tooltip key={index}>
            <TooltipContent>{t('preview')}</TooltipContent>
            <TooltipTrigger asChild>
              <img
                src={slide.src}
                width={120}
                height={100}
                onClick={() => {
                  setIsOpen(true)
                  setCurrentIndex(index)
                }}
                alt=""
                className={cn(
                  'h-[100px] w-[120px] cursor-pointer rounded-sm object-cover',
                  className
                )}
                {...props}
              />
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Zoom]}
        portal={{
          root: typeof document !== 'undefined' ? document.body : undefined
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2
        }}
      />
    </>
  )
}
