import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PostHogProvider } from '../PostHogProvider'
import { render } from '@solidjs/testing-library'

describe('PostHogContext component', () => {
  let posthogClient
  let renderResult
  beforeEach(() => {
    posthogClient = {}
  })
  const renderComponent = () => {
    renderResult = render(
      <PostHogProvider client={posthogClient}>
        <div>Hello</div>
      </PostHogProvider>,
    )
  }
  it('should return a client instance from the context if available', () => {
    renderComponent()
    // You can add assertions here if needed
  })

  it("should not throw error if a client instance can't be found in the context", () => {
    posthogClient = undefined

    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() => renderComponent()).not.toThrow()
    expect(consoleWarnMock).toHaveBeenCalledWith(
      '[PostHog.js] No `apiKey` or `client` were provided to `PostHogProvider`. Using default global `window.posthog` instance. You must initialize it manually. This is not recommended behavior.',
    )
    consoleWarnMock.mockRestore()
  })
})
