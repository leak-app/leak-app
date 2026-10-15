import { formatSignedVnd } from '@/shared/lib';

import type { RawTransferModel, TransferItemModel } from '../model/types';

/** "2026-10-01T00:00:00.000Z" → "01/10/2026". The API sends a date, so the UTC part is the day. */
function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

/** Shows `raw` from the point of view of the wallet `walletId`. */
export function deserializeTransfer(
  raw: RawTransferModel,
  walletId: string
): TransferItemModel {
  const incoming = raw.toAccountId === walletId;
  const amount = Number(raw.amount);
  return {
    id: raw.id,
    dateText: formatDate(raw.occurredAt),
    title: incoming ? `Từ ${raw.from.name}` : `Đến ${raw.to.name}`,
    amountText: formatSignedVnd(incoming ? amount : -amount),
    toneClass: incoming ? 'text-primary' : 'text-text',
    note: raw.note,
    createdAt: raw.createdAt,
  };
}
