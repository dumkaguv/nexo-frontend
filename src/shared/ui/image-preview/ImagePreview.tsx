import { X } from 'lucide-react'
import { useMemo, useState, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'

import { cn } from '@/shared/lib'
import { Image, Typography } from '@/shared/ui'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

type Props = (
  | {
      files: File[]
      srcs?: never
    }
  | {
      srcs: string[]
      files?: never
    }
) & {
  containerClassName?: string
  maxImages?: number
  showDeleteIcon?: boolean
  isPending?: boolean
  onDeleteImage?: (index: number) => void
} & ComponentProps<'img'>

export const ImagePreview = ({
  files,
  srcs,
  className,
  containerClassName,
  maxImages = 10000000,
  showDeleteIcon,
  onDeleteImage: onDeleteImageCb,
  isPending,
  ...props
}: Props) => {
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

  const onDeleteImage = (index: number) => {
    if (onDeleteImageCb) {
      onDeleteImageCb(index)
    }
  }

  const renderSlide = (index: number, src: string) => (
    <Tooltip key={index}>
      <TooltipContent>{t('preview')}</TooltipContent>
      <div className="relative w-fit">
        <TooltipTrigger asChild>
          <Image
            src={src}
            width={120}
            height={100}
            onClick={() => onImageClick(index)}
            className={cn(
              'size-full cursor-pointer rounded-sm object-cover',
              className
            )}
            {...props}
          />
        </TooltipTrigger>

        {showDeleteIcon && (
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onDeleteImage(index)}
            disabled={isPending}
            className="absolute -top-2 -right-2 size-6 rounded-full"
          >
            <X className="size-3" />
          </Button>
        )}
      </div>
    </Tooltip>
  )

  if (!slides.length) {
    return null
  }

  return (
    <>
      <div className={cn('flex w-fit flex-wrap gap-2', containerClassName)}>
        {slides.length <= maxImages ? (
          slides
            .slice(0, maxImages)
            .map(({ src }, index) => renderSlide(index, src))
        ) : (
          <>
            {slides
              .slice(0, maxImages - 1)
              .map(({ src }, index) => renderSlide(index, src))}

            <Tooltip>
              <TooltipContent>{t('seeFullList')}</TooltipContent>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onImageClick(maxImages - 1)}
                  className={cn(
                    'relative m-0 cursor-pointer overflow-hidden rounded-sm border-0 bg-transparent p-0'
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Typography.Text className="text-lg font-semibold text-white">
                      +{slides.length - maxImages + 1}
                    </Typography.Text>
                  </div>

                  <Image
                    src={slides[maxImages - 1]?.src}
                    alt={`Slide ${maxImages}`}
                    className={cn('size-full object-cover', className)}
                  />
                </button>
              </TooltipTrigger>
            </Tooltip>
          </>
        )}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Zoom, Thumbnails, Counter, Fullscreen]}
        counter={{ container: { style: { top: 0 } } }}
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
