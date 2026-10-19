import type {
  BalancePreviewInputModel,
  BalancePreviewModel,
} from '../model/types.ts';

const roundPercent = (ratio: number) => Math.round(ratio * 1000) / 10;

/**
 * Mirrors the API: the wallet balance already holds every deposit and withdrawal
 * since the last update, so `current − previous` is the money the user moved and
 * `entered − current` is profit. Only a preview; the server recomputes on save.
 */
export function computeBalancePreview(
  input: BalancePreviewInputModel
): BalancePreviewModel | null {
  if (input.entered === null) return null;

  const previous = input.lastBalance ?? input.initialBalance;
  const netFlow = input.currentBalance - previous;
  const adjustment = input.entered - input.currentBalance;
  const isBaseline = input.lastBalance === null && input.asBaseline;
  const gain = isBaseline ? 0 : adjustment;
  const base = previous + Math.max(netFlow, 0);

  return {
    netFlow,
    adjustment,
    gain,
    returnPercent: isBaseline || base <= 0 ? null : roundPercent(gain / base),
    isBaseline,
  };
}

/** A liquid wallet has no profit: the entered balance is the new starting point. */
export function computeLiquidAdjustment(
  currentBalance: number,
  entered: number | null
): number | null {
  return entered === null ? null : entered - currentBalance;
}
