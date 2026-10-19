import { useBalanceVisibility } from '@/shared/hooks';
import { BalanceToggleButton } from '@/shared/ui';

interface Props {
  totalText: string;
  countTexts: string[];
}

export function WalletTotalCard({ totalText, countTexts }: Props) {
  const { mask } = useBalanceVisibility();
  return (
    <div className="card bg-surface border border-outline/10 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-on-surface-variant">
          Tổng số dư các ví
        </span>
        <BalanceToggleButton />
      </div>
      <span className="mt-2 text-4xl font-bold text-on-surface tabular-nums">
        {mask(totalText)}
      </span>
      <span className="mt-3 text-xs text-on-surface-variant">
        {countTexts.join(' · ')}
      </span>
    </div>
  );
}
