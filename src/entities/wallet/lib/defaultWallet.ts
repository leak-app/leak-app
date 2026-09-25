import type { WalletModel } from '../model/types';

const byCreatedAt = (a: WalletModel, b: WalletModel) =>
  a.createdAt.localeCompare(b.createdAt);

/**
 * Mirrors the API's default: the last used wallet if it is still active,
 * else the oldest LIQUID wallet, else the oldest wallet.
 * `wallets` must contain active wallets only (GET /wallets already filters).
 */
export function pickDefaultWallet(
  wallets: WalletModel[],
  lastWalletId: string | null
): WalletModel | undefined {
  const last = lastWalletId
    ? wallets.find((w) => w.id === lastWalletId)
    : undefined;
  if (last) return last;
  const sorted = [...wallets].sort(byCreatedAt);
  return sorted.find((w) => w.type === 'LIQUID') ?? sorted[0];
}
