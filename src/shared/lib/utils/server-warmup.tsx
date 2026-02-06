import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useServerWarmupToast = (isPending: boolean) => {
  const { t } = useTranslation()
  const timeoutRef = useRef<number | null>(null)
  const hasShownRef = useRef(false)
  const warmupUrl = import.meta.env.VITE_PUBLIC_API_URL as string | undefined
  const isProduction = import.meta.env.MODE === 'production'

  useEffect(() => {
    if (!isProduction || !warmupUrl) {
      return
    }

    if (isPending && !timeoutRef.current && !hasShownRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        toast.custom(
          () => (
            <div className="bg-background text-foreground flex w-full flex-col gap-2 rounded-md border p-3 shadow-md">
              <div className="text-sm">{t('serverWakingUp')}</div>
              <a
                href={warmupUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary text-sm font-medium underline underline-offset-2"
              >
                {t('checkStatus')}
              </a>
            </div>
          ),
          { duration: 8000 }
        )
        hasShownRef.current = true
      }, 4500)
    }

    if (!isPending) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      hasShownRef.current = false
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isPending, isProduction, t, warmupUrl])
}
