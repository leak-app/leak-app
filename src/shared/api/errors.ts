/**
 * apiClient rejects with the response body ({ success: false, error: { message } })
 * for HTTP errors, or with an Error for network failures.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object') {
    const body = error as { error?: { message?: unknown } };
    const message = body.error?.message;
    if (Array.isArray(message) && typeof message[0] === 'string')
      return message[0];
    if (typeof message === 'string' && message) return message;
    if (error instanceof Error && error.message) return error.message;
  }
  return fallback;
}
