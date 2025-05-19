import { render } from '@solidjs/testing-library'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PostHogErrorBoundary } from '../PostHogErrorBoundary'
import posthog from 'posthog-js'

vi.mock('posthog-js', () => ({
  default: {
    capture: vi.fn(),
    captureException: vi.fn(),
  },
}))

const mockCaptureException = posthog.captureException as ReturnType<typeof vi.fn>

const ComponentWithError = (props: { message?: string }) => {
  throw new Error(props.message ?? 'Error')
}

const RenderWithError = (props: any) => (
  <PostHogErrorBoundary {...props}>
    <ComponentWithError message={props.message} />
  </PostHogErrorBoundary>
)

const RenderWithoutError = (props: any) => (
  <PostHogErrorBoundary {...props}>
    <div>Amazing content</div>
  </PostHogErrorBoundary>
)

describe('PostHogErrorBoundary (Solid)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('captures an error', () => {
    const fallback = <div>Error occurred</div>
    const { getByText } = render(() => <RenderWithError fallback={fallback} message="Test error" />)
    expect(getByText('Error occurred')).toBeTruthy()
    expect(mockCaptureException).toHaveBeenCalledWith(new Error('Test error'), undefined)
  })
  it('does not render fallback if no error', () => {
    const { container } = render(() => <RenderWithoutError fallback={<div>Fallback</div>} />)
    expect(container.innerHTML).toBe('<div>Amazing content</div>')
  })
  it('warns for invalid fallback (null)', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(() => <RenderWithError fallback={null} />)
    expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('Invalid fallback'))
    consoleWarn.mockRestore()
  })
  it('uses additional properties from object', () => {
    render(() => <RenderWithError fallback={<div />} additionalProperties={{ team_id: '123' }} />)
    expect(mockCaptureException).toHaveBeenCalledWith(new Error('Error'), { team_id: '123' })
  })
  it('uses additional properties from function', () => {
    const propsFn = vi.fn(() => ({ team_id: 'abc' }))
    render(() => <RenderWithError fallback={<div />} additionalProperties={propsFn} />)
    expect(propsFn).toHaveBeenCalled()
    expect(mockCaptureException).toHaveBeenCalledWith(new Error('Error'), { team_id: 'abc' })
  })
})
