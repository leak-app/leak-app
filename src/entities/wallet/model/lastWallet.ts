const KEY = 'leak.lastWalletId';

export function readLastWalletId(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function writeLastWalletId(id: string): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // Private mode or blocked storage: the default rule still applies.
  }
}
