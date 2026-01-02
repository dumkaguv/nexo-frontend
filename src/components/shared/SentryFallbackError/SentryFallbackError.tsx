type Props = {
  error: unknown
  componentStack: string
  eventId: string
  resetError: () => void
}

export const SentryFallbackError = ({
  error,
  eventId,
  componentStack,
  resetError
}: Props) => (
  <div>
    <h2>Something went wrong.</h2>
    <pre>{String(error)}</pre>
    <pre>{componentStack}</pre>
    <p>Event ID: {eventId}</p>
    <button onClick={resetError}>Try again</button>
  </div>
)
