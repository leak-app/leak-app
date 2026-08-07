interface TotalBalanceCardProps {
  totalBalance: number;
  growthPercentage: number;
  accountsCount: number;
}

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN');
}

export function TotalBalanceCard({
  totalBalance,
  growthPercentage,
  accountsCount,
}: TotalBalanceCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-bold tracking-widest text-on-surface-variant/70 uppercase">
        Tổng số dư hiện tại
      </span>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-on-surface tracking-tight">
          {formatVND(totalBalance)}
        </span>
        <span className="text-lg font-bold text-primary">VND</span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div className="badge badge-success badge-soft font-semibold gap-1 px-3 py-1 text-xs">
          <span>📈</span>
          <span>+{growthPercentage}%</span>
        </div>

        <div className="badge badge-info badge-soft font-medium gap-1.5 px-3 py-1 text-xs">
          <span>💳</span>
          <span>{accountsCount} Tài khoản</span>
        </div>
      </div>
    </div>
  );
}
