import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useWebSocket } from '@/hooks/useWebSocket'

import { WebSocketContext } from '@/stores'

import type { ReactNode } from 'react'

describe('useWebSocket', () => {
  it('throws when used without provider', () => {
    expect(() => renderHook(() => useWebSocket())).toThrow(
      'useWebSocket must be used within WebSocketProvider'
    )
  })

  it('returns context value', () => {
    const value = {
      socket: {} as never,
      isConnected: true,
      isConnecting: false,
      lastError: null,
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn()
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
      <WebSocketContext.Provider value={value}>
        {children}
      </WebSocketContext.Provider>
    )

    const { result } = renderHook(() => useWebSocket(), { wrapper })

    expect(result.current).toBe(value)
  })
})
