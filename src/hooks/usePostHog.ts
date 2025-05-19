import { useContext } from 'solid-js'
import { PostHogContext } from '../context'
import { PostHog } from 'posthog-js'

export const usePostHog = (): PostHog => {
  const { client } = useContext(PostHogContext)
  return client
}
