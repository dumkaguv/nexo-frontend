import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { cn } from '@/utils'

import { Image } from './'

import type { ComponentProps } from 'react'

type Props =
  | {
      files: File[]
      srcs?: never
    }
  | {
      srcs: string[]
      files?: never
    }

type ImagePreviewProps = Props & ComponentProps<'img'>

export const ImagePreview = ({
  files,
  srcs,
  className,
  ...props
}: ImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { t } = useTranslation()

  const slides = useMemo(() => {
    if (files?.length) {
      return files.map((file) => ({ src: URL.createObjectURL(file) }))
    }
    if (srcs?.length) {
      return srcs.map((src) => ({ src }))
    }
    return []
  }, [files, srcs])

  const onImageClick = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  if (!slides.length) return null

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {slides.map((slide, index) => (
          <Tooltip key={index}>
            <TooltipContent>{t('preview')}</TooltipContent>
            <TooltipTrigger asChild>
              <Image
                src={slide.src}
                width={120}
                height={100}
                onClick={() => onImageClick(index)}
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
