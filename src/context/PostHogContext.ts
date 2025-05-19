import posthog from 'posthog-js'
import { createContext } from 'solid-js'

export const PostHogContext = createContext<{ client: typeof posthog }>({ client: posthog })
