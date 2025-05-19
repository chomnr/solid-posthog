import posthog, { PostHog, PostHogConfig } from 'posthog-js'
import { createEffect, createMemo, createSignal, JSX, onMount } from 'solid-js'
import { PostHogContext } from './PostHogContext'
import { isDeepEqual } from 'src/utils/object-utils'
import { PostHogErrorBoundaryProps } from 'src/components'

interface PreviousInitialization {
  apiKey: string
  options: Partial<PostHogConfig>
}

type WithOptionalChildren<T> = T & { children: JSX.Element | undefined }

/**
 * Props for the PostHogProvider component.
 * This is a discriminated union type that ensures mutually exclusive props:
 *
 * - If `client` is provided, `apiKey` and `options` must not be provided
 * - If `apiKey` is provided, `client` must not be provided, and `options` is optional
 */
type PostHogProviderProps =
  | { client: PostHog; apiKey?: never; options?: never }
  | { apiKey: string; options?: Partial<PostHogConfig>; client?: never }

export function PostHogProvider({
  children,
  client,
  apiKey,
  options,
}: WithOptionalChildren<PostHogProviderProps>) {
  // Because we're using onMount instead of createEffect this initialization is likely very redundant. Because onMount only gets called once.
  const [previousInitialization, setPreviousInitialization] =
    createSignal<PreviousInitialization | null>(null)
  const postHogJs = createMemo(() => {
    if (client) {
      if (apiKey) {
        console.warn(
          '[PostHog.js] You have provided both `client` and `apiKey` to `PostHogProvider`. `apiKey` will be ignored in favour of `client`.',
        )
      }
      if (options) {
        console.warn(
          '[PostHog.js] You have provided both `client` and `options` to `PostHogProvider`. `options` will be ignored in favour of `client`.',
        )
        return client
      }
    }
    if (apiKey) {
      return posthog
    }
    console.warn(
      '[PostHog.js] No `apiKey` or `client` were provided to `PostHogProvider`. Using default global `window.posthog` instance. You must initialize it manually. This is not recommended behavior.',
    )
    return posthog
  }, [client, apiKey, JSON.stringify(options)])

  onMount(() => {
    if (client) return
    const prev = previousInitialization()
    if (!prev) {
      if (posthog.__loaded) {
        console.warn('[PostHog.js] `posthog` was already loaded elsewhere. This may cause issues.')
      }
      posthog.init(apiKey, options)
      setPreviousInitialization({
        apiKey,
        options: options ?? {},
      })
    } else {
      if (apiKey !== prev.apiKey) {
        console.warn(
          "[PostHog.js] You have provided a different `apiKey` to `PostHogProvider` than the one that was already initialized. This is not supported by our provider and we'll keep using the previous key. If you need to toggle between API Keys you need to control the `client` yourself and pass it in as a prop rather than an `apiKey` prop.",
        )
      }
      if (options && !isDeepEqual(options, prev.options)) {
        posthog.set_config(options)
      }
      setPreviousInitialization({
        apiKey,
        options: options ?? {},
      })
    }
  })
  return (
    <PostHogContext.Provider value={{ client: postHogJs() }}>{children}</PostHogContext.Provider>
  )
}
