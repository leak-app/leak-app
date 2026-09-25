interface Props {
  totalText: string;
  countTexts: string[];
}

export function WalletTotalCard({ totalText, countTexts }: Props) {
  return (
    <div className="card bg-surface border border-outline/10 rounded-3xl p-6 shadow-lg">
      <span className="text-xs font-medium text-on-surface-variant">
        Tổng số dư các ví
      </span>
      <span className="mt-2 text-4xl font-bold text-on-surface tabular-nums">
        {totalText}
      </span>
      <span className="mt-3 text-xs text-on-surface-variant">
        {countTexts.join(' · ')}
      </span>
    </div>
  );
}
