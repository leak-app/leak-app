import { formatSignedPercent, formatSignedVnd, formatVnd } from '@/shared/lib';

import type {
  BalancePreviewContextModel,
  BalancePreviewModel,
  BalancePreviewViewModel,
  LiquidAdjustmentViewModel,
} from '../model/types';

const GAIN_CLASS = 'text-primary';
const LOSS_CLASS = 'text-danger';
const FLAT_CLASS = 'text-muted';

const GAIN_CARD = 'border-primary/35 bg-primary/10';
const LOSS_CARD = 'border-danger/35 bg-danger/10';
const BASELINE_CARD = 'border-secondary/30 bg-secondary/8';
const FLAT_CARD = 'border-border bg-surface';

export function deserializeBalancePreview(
  preview: BalancePreviewModel,
  context: BalancePreviewContextModel
): BalancePreviewViewModel {
  const flowText = formatSignedVnd(preview.netFlow);
  const previous =
    context.lastBalance !== null && context.lastDayText
      ? {
          label: `Lần trước · ${context.lastDayText}`,
          amountText: formatVnd(context.lastBalance),
        }
      : null;

  if (preview.isBaseline) {
    return {
      label: 'Số dư mốc',
      amountText: formatSignedVnd(preview.adjustment),
      returnNote: null,
      toneClass: 'text-secondary',
      cardClass: BASELINE_CARD,
      previous,
      flowText,
      note: 'Phần chênh lệch được tính là vốn, không phải lãi hay lỗ. Từ tháng sau Leak sẽ so với con số này.',
    };
  }

  const { gain } = preview;
  const returnText =
    preview.returnPercent === null
      ? null
      : formatSignedPercent(preview.returnPercent);
  return {
    label: gain > 0 ? 'Lãi' : gain < 0 ? 'Lỗ' : 'Không đổi',
    amountText: formatSignedVnd(gain),
    // On the first update the percent explains where the profit is counted from.
    returnNote: context.isFirstUpdate
      ? null
      : returnText && `${returnText} · ước tính`,
    toneClass: gain > 0 ? GAIN_CLASS : gain < 0 ? LOSS_CLASS : FLAT_CLASS,
    cardClass: gain > 0 ? GAIN_CARD : gain < 0 ? LOSS_CARD : FLAT_CARD,
    previous,
    flowText,
    note: context.isFirstUpdate
      ? returnText
        ? `${returnText} · ước tính, tính từ lúc mở ví.`
        : 'Tính từ lúc mở ví.'
      : null,
  };
}

export function deserializeLiquidAdjustment(
  adjustment: number
): LiquidAdjustmentViewModel {
  return {
    differenceText: formatSignedVnd(adjustment),
    toneClass:
      adjustment > 0 ? GAIN_CLASS : adjustment < 0 ? LOSS_CLASS : FLAT_CLASS,
  };
}
