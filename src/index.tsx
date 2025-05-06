import { createSignal, createEffect, onMount, JSX, createContext, useContext } from 'solid-js'
import { useLocation, useSearchParams } from '@solidjs/router'
import posthog from 'posthog-js'
import type { PostHog } from 'posthog-js'

type PostHogContextType = {
  client: PostHog | null
  setClient: (client: PostHog) => void
  isInitialized: boolean
}

const PostHogContext = createContext<PostHogContextType>({
  client: null,
  setClient: () => {},
  isInitialized: false,
})

export function createPostHogContext() {
  const [client, setClient] = createSignal<PostHog | null>(null)
  const [isInitialized, setIsInitialized] = createSignal<boolean>(false)

  return {
    get client() {
      return client()
    },
    setClient: (newClient: PostHog) => {
      setClient(newClient)
      setIsInitialized(true)
    },
    get isInitialized() {
      return isInitialized()
    },
  }
}

export function usePostHog() {
  return useContext(PostHogContext)
}

interface PostHogProviderProps {
  children: JSX.Element
  token?: string
  apiHost?: string
  debug?: boolean
}

export function PostHogProvider(props: PostHogProviderProps) {
  const posthogContext = createPostHogContext()

  onMount(() => {
    const token = props.token
    const apiHost = props.apiHost || 'https://us.i.posthog.com'

    if (token) {
      try {
        posthog.init(token, {
          api_host: apiHost,
          person_profiles: 'identified_only',
          capture_pageview: false,
          debug: props.debug || false,
        })

        posthogContext.setClient(posthog)

        if (props.debug) {
          console.log('[PostHog] Successfully initialized')
        }
      } catch (error) {
        console.error('[PostHog] Failed to initialize:', error)
      }
    } else {
      console.warn('[PostHog] No token provided. PostHog tracking is disabled.')
    }
  })

  return <PostHogContext.Provider value={posthogContext}>{props.children}</PostHogContext.Provider>
}

export function PostHogPageViewTracker() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const posthogContext = usePostHog()

  createEffect(() => {
    const pathname = location.pathname
    const client = posthogContext.client
    const isInitialized = posthogContext.isInitialized

    if (pathname && client && isInitialized) {
      let url = window.origin + pathname

      const paramsEntries = Object.entries(searchParams)
      const urlSearchParams = new URLSearchParams()

      paramsEntries.forEach(([key, value]) => {
        if (value !== undefined) {
          urlSearchParams.append(key, value.toString())
        }
      })

      const searchParamsString = urlSearchParams.toString()

      if (searchParamsString) {
        url = url + '?' + searchParamsString
      }

      client.capture('$pageview', { $current_url: url })
    }
  })

  return null
}
