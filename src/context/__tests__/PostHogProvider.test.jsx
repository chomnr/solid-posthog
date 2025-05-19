// src/context/__tests__/PostHogProvider.test.tsx
import { render } from '@solidjs/testing-library'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PostHogProvider } from '../PostHogProvider'
import { createSignal } from 'solid-js'

// Mock posthog-js
vi.mock('posthog-js', () => {
  return {
    default: {
      init: vi.fn(),
      set_config: vi.fn(),
      __loaded: false,
    },
  }
})

import posthog from 'posthog-js'

describe('PostHogProvider component', () => {
  it('should render children components', () => {
    const posthog = {}
    const { getByText } = render(() => (
      <PostHogProvider client={posthog}>
        <div>Test</div>
      </PostHogProvider>
    ))
    expect(getByText('Test')).toBeTruthy()
  })
  describe('when using apiKey initialization', () => {
    const apiKey = 'test-api-key'
    const initialOptions = { api_host: 'https://app.posthog.com' }
    const updatedOptions = { api_host: 'https://eu.posthog.com' }
    beforeEach(() => {
      vi.clearAllMocks()
    })
    it('should call set_config when options change', async () => {
      const [opts, setOpts] = createSignal(initialOptions)
      render(() => (
        <PostHogProvider apiKey={apiKey} options={opts()}>
          <div>Test</div>
        </PostHogProvider>
      ))
      expect(posthog.init).toHaveBeenCalledWith(apiKey, initialOptions)
      setOpts(updatedOptions)
      await Promise.resolve()
      expect(posthog.set_config).toHaveBeenCalledWith(updatedOptions)
    })
    it('should NOT call set_config with same options reference', async () => {
      const [opts, setOpts] = createSignal(initialOptions)
      render(() => (
        <PostHogProvider apiKey={apiKey} options={opts()}>
          <div>Test</div>
        </PostHogProvider>
      ))
      expect(posthog.init).toHaveBeenCalledWith(apiKey, initialOptions)
      const sameOptions = { ...initialOptions }
      setOpts(sameOptions)
      await Promise.resolve()
      expect(posthog.set_config).not.toHaveBeenCalled()
    })
    it('should warn when attempting to change apiKey', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const [key, setKey] = createSignal(apiKey)
      render(() => (
        <PostHogProvider apiKey={key()} options={initialOptions}>
          <div>Test</div>
        </PostHogProvider>
      ))
      expect(posthog.init).toHaveBeenCalledWith(apiKey, initialOptions)
      setKey('new-api-key')
      await Promise.resolve()
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('You have provided a different `apiKey` to `PostHogProvider`'),
      )
      consoleSpy.mockRestore()
    })
    it('warns if posthogJs has been loaded elsewhere', () => {
      posthog.__loaded = true
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      render(() => (
        <PostHogProvider apiKey={apiKey} options={initialOptions}>
          <div>Test</div>
        </PostHogProvider>
      ))
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('`posthog` was already loaded elsewhere'),
      )
      consoleSpy.mockRestore()
      posthog.__loaded = false
    })
  })
})
