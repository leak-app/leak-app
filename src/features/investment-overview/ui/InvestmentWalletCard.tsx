import type { PortfolioWalletModel } from '@/entities/valuation';
import { useBalanceVisibility } from '@/shared/hooks';
import { HistoryIcon, ICON, PlusIcon } from '@/shared/icons';
import { Button, Card } from '@/shared/ui';

interface InvestmentWalletCardProps {
  wallet: PortfolioWalletModel;
  onUpdateBalance: (walletId: string) => void;
  onAddFunds: (walletId: string) => void;
  onOpenHistory: (wallet: PortfolioWalletModel) => void;
}

export function InvestmentWalletCard({
  wallet,
  onUpdateBalance,
  onAddFunds,
  onOpenHistory,
}: InvestmentWalletCardProps) {
  const { mask } = useBalanceVisibility();

  return (
    <Card
      as="li"
      className="flex flex-col gap-1.5 !p-5"
    >
      <div className="flex items-baseline gap-3">
        <button
          type="button"
          onClick={() => onOpenHistory(wallet)}
          className="min-h-touch min-w-0 flex-1 truncate text-left text-heading text-text focus-visible:shadow-focus focus-visible:outline-none"
        >
          {wallet.name}
        </button>
        <span className="text-heading tabular-nums text-text">
          {mask(wallet.valueText)}
        </span>
      </div>

      {wallet.profit && (
        <span className="-mt-2 text-label font-normal text-soft">
          <span className={`font-semibold ${wallet.profit.toneClass}`}>
            {wallet.profit.word} {mask(wallet.profit.amountText)}
          </span>
          {wallet.profit.returnText && ` · ${wallet.profit.returnText}`}
        </span>
      )}
      <span className="text-caption text-muted">
        {wallet.updatedText}
        {wallet.isStale && (
          <span className="text-secondary"> · chưa cập nhật tháng này</span>
        )}
      </span>

      <div className="mt-2.5 flex gap-2">
        <Button
          variant={wallet.isStale ? 'reminder' : 'secondary'}
          className="flex-1 text-sm"
          onClick={() => onUpdateBalance(wallet.id)}
        >
          Cập nhật số dư
        </Button>
        <Button
          variant="secondary"
          className="w-11 !px-0"
          aria-label={`Nạp thêm tiền vào ${wallet.name}`}
          onClick={() => onAddFunds(wallet.id)}
        >
          <PlusIcon
            size={ICON.size.row}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
        </Button>
        <Button
          variant="secondary"
          className="w-11 !px-0"
          aria-label={`Xem lịch sử ${wallet.name}`}
          onClick={() => onOpenHistory(wallet)}
        >
          <HistoryIcon
            size={ICON.size.row}
            strokeWidth={ICON.stroke.idle}
            aria-hidden="true"
          />
        </Button>
      </div>
    </Card>
  );
}
