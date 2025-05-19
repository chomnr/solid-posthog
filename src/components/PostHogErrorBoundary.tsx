import { ErrorBoundary, JSX } from 'solid-js'
import { PostHogContext } from '../context'
import { isFunction } from '../utils/type-utils'
import { useContext } from 'solid-js'

export type Properties = Record<string, any>

export type PostHogErrorBoundaryFallbackProps = {
  error: unknown
}

export type PostHogErrorBoundaryProps = {
  children?: JSX.Element
  fallback?: JSX.Element | ((props: PostHogErrorBoundaryFallbackProps) => JSX.Element)
  additionalProperties?: Properties | ((error: unknown) => Properties)
}

export const __POSTHOG_ERROR_MESSAGES = {
  INVALID_FALLBACK:
    '[PostHog.js][PostHogErrorBoundary] Invalid fallback prop, provide a valid JSX element or a function that returns one.',
}

export function PostHogErrorBoundary(props: PostHogErrorBoundaryProps) {
  const context = useContext(PostHogContext)
  const handleError = (error: unknown) => {
    const { additionalProperties } = props
    let currentProperties: Properties | undefined
    if (isFunction(additionalProperties)) {
      currentProperties = additionalProperties(error)
    } else if (typeof additionalProperties === 'object') {
      currentProperties = additionalProperties
    }
    if (context?.client) {
      context.client.captureException(error, currentProperties)
    }
  }

  return (
    <ErrorBoundary
      fallback={error => {
        handleError(error)
        const { fallback } = props
        const fallbackElement = isFunction(fallback) ? fallback({ error }) : fallback
        if (fallbackElement) return fallbackElement
        console.warn(__POSTHOG_ERROR_MESSAGES.INVALID_FALLBACK)
        return <></>
      }}
    >
      {props.children}
    </ErrorBoundary>
  )
}
