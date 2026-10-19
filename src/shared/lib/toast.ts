export const TOAST_DURATION_MS = 3000;

export interface ToastState {
  id: number;
  message: string;
}

export type ToastAction =
  | { type: 'show'; id: number; message: string }
  | { type: 'dismiss'; id: number };

/**
 * One message at a time. A newer toast replaces the current one, and a timer
 * that fires late for an older toast (`dismiss` with an old id) leaves the
 * newer one alone.
 */
export function toastReducer(
  state: ToastState | null,
  action: ToastAction
): ToastState | null {
  if (action.type === 'show') return { id: action.id, message: action.message };
  return state?.id === action.id ? null : state;
}
