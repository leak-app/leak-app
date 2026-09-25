import { formatVnd } from '@/shared/lib';

import type {
  AccountType,
  UpdateWalletParamsModel,
  WalletModel,
  WalletSummaryModel,
} from '../model/types';
import { WALLET_TYPE_LABELS } from './deserialize';

const GROUP_ORDER: AccountType[] = ['LIQUID', 'INVESTMENT'];
const COUNT_NOUNS: Record<AccountType, string> = {
  LIQUID: 'ví tiền mặt',
  INVESTMENT: 'ví đầu tư',
};

const signedVnd = (n: number) => (n < 0 ? `−${formatVnd(-n)}` : formatVnd(n));
const sum = (wallets: WalletModel[]) =>
  wallets.reduce((acc, w) => acc + w.currentBalance, 0);

export function summarizeWallets(wallets: WalletModel[]): WalletSummaryModel {
  const groups = GROUP_ORDER.map((type) => {
    const inGroup = wallets.filter((w) => w.type === type);
    return {
      type,
      title: WALLET_TYPE_LABELS[type],
      totalText: signedVnd(sum(inGroup)),
      wallets: inGroup,
    };
  }).filter((g) => g.wallets.length > 0);

  return {
    totalText: signedVnd(sum(wallets)),
    countTexts: groups.map((g) => `${g.wallets.length} ${COUNT_NOUNS[g.type]}`),
    groups,
    canArchive: wallets.length > 1,
  };
}

/** Only changed fields, so the strict PATCH schema never sees extra keys. */
export function buildUpdatePayload(
  wallet: WalletModel,
  name: string,
  initialBalance: number
): UpdateWalletParamsModel | null {
  const payload: UpdateWalletParamsModel = { id: wallet.id };
  const trimmed = name.trim();
  if (trimmed !== wallet.name) payload.name = trimmed;
  if (initialBalance !== wallet.initialBalance)
    payload.initialBalance = initialBalance;
  return Object.keys(payload).length > 1 ? payload : null;
}
