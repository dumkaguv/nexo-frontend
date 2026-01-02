import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { SentryFallbackError } from './components/shared'

Sentry.init({
  dsn: 'https://d293bf9cf88e3a9e18dbb4c9d07a41c5@o4510640057352192.ingest.de.sentry.io/4510640059121744',
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={SentryFallbackError}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
)
