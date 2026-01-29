import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useWebSocket, type WebSocketDefaultValue } from '@/shared/hooks'
import { SOCKET_NAMESPACES } from '@/shared/lib/api/socket'

import { WebSocketContext } from '@/shared/model'

import type { ReactNode } from 'react'

describe('useWebSocket', () => {
  it('throws when used without provider', () => {
    expect(() => renderHook(() => useWebSocket())).toThrow(
      'useWebSocket must be used within WebSocketProvider'
    )
  })

  it('returns context value', () => {
    const socketValue = {
      socket: {} as never,
      isConnected: true,
      isConnecting: false,
      lastError: null,
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn()
    }
    const connectAll = vi.fn()
    const disconnectAll = vi.fn()

    const value = {
      getSocket: vi.fn(() => socketValue),
      namespaces: [SOCKET_NAMESPACES.messages],
      connectAll,
      disconnectAll
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
      <WebSocketContext.Provider value={value}>
        {children}
      </WebSocketContext.Provider>
    )

    const { result } = renderHook(() => useWebSocket(), { wrapper })

    const current = result.current as WebSocketDefaultValue

    expect(current.socket).toBe(socketValue.socket)
    expect(current.isConnected).toBe(socketValue.isConnected)
    expect(current.isConnecting).toBe(socketValue.isConnecting)
    expect(current.lastError).toBe(socketValue.lastError)
    expect(current.emit).toBe(socketValue.emit)
    expect(current.connect).toBe(connectAll)
    expect(current.disconnect).toBe(disconnectAll)
    expect(current.namespaces).toBe(value.namespaces)
  })

  it('returns namespace socket value when provided', () => {
    const socketValue = {
      socket: {} as never,
      isConnected: false,
      isConnecting: true,
      lastError: 'oops',
      connect: vi.fn(),
      disconnect: vi.fn(),
      emit: vi.fn()
    }

    const value = {
      getSocket: vi.fn(() => socketValue),
      namespaces: [SOCKET_NAMESPACES.messages, SOCKET_NAMESPACES.conversations],
      connectAll: vi.fn(),
      disconnectAll: vi.fn()
    }

    const wrapper = ({ children }: { children: ReactNode }) => (
      <WebSocketContext.Provider value={value}>
        {children}
      </WebSocketContext.Provider>
    )

    const { result } = renderHook(
      () => useWebSocket(SOCKET_NAMESPACES.conversations),
      {
        wrapper
      }
    )

    expect(result.current).toBe(socketValue)
  })
})
