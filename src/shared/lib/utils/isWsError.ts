/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { WsError } from '@/shared/types'

export const isWsError = (x: unknown): x is WsError =>
  !!x &&
  typeof x === 'object' &&
  (x as any).status === 'error' &&
  typeof (x as any).message === 'string'
