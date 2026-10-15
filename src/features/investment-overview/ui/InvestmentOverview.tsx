import { useState } from 'react';

import { usePortfolio, type PortfolioWalletModel } from '@/entities/valuation';
import { ArrowLeftRightIcon, ICON } from '@/shared/icons';
import { Button, Card } from '@/shared/ui';

import { InvestmentEmpty } from './InvestmentEmpty';
import { InvestmentWalletCard } from './InvestmentWalletCard';
import { MonthlyChecklist } from './MonthlyChecklist';
import { PortfolioHero } from './PortfolioHero';
import { ProfitChart } from './ProfitChart';
import { ValuationHistorySheet } from './ValuationHistorySheet';

interface InvestmentOverviewProps {
  /** Opens the balance update sheet; the page owns it. */
  onUpdateBalance: (walletId: string) => void;
  /** Opens the transfer sheet with this wallet as the destination; the page owns it. */
  onAddFunds: (walletId: string) => void;
  /** Opens the transfer sheet without a preset; the page owns it. */
  onTransfer: () => void;
}

/** This month's result, the wallets to update, one card per wallet and the monthly profit. */
export function InvestmentOverview({
  onUpdateBalance,
  onAddFunds,
  onTransfer,
}: InvestmentOverviewProps) {
  const { data, isLoading, isError, refetch } = usePortfolio();
  const [historyFor, setHistoryFor] = useState<PortfolioWalletModel | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span
          className="loading loading-spinner loading-md text-primary"
          aria-label="Đang tải"
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card
        variant="danger"
        role="alert"
        className="flex flex-col items-start gap-3"
      >
        <span className="text-description text-text">
          Không tải được dữ liệu đầu tư.
        </span>
        <Button
          variant="secondary"
          onClick={() => refetch()}
        >
          Thử lại
        </Button>
      </Card>
    );
  }

  if (!data.hasWallets) return <InvestmentEmpty />;

  return (
    <div className="flex flex-col gap-6">
      <PortfolioHero hero={data.hero} />

      {data.checklist && (
        <MonthlyChecklist
          checklist={data.checklist}
          onUpdate={onUpdateBalance}
        />
      )}

      {data.months.length > 0 && <ProfitChart months={data.months} />}

      <div className="flex items-center justify-between">
        <h2 className="text-heading text-text">Ví đầu tư</h2>
        <button
          type="button"
          onClick={onTransfer}
          className="flex h-11 items-center gap-1.5 text-label text-primary focus-visible:shadow-focus focus-visible:outline-none"
        >
          <ArrowLeftRightIcon
            size={ICON.size.row - 2}
            strokeWidth={ICON.stroke.active}
            aria-hidden="true"
          />
          Chuyển tiền giữa các ví
        </button>
      </div>

      <ul className="-mt-3 flex flex-col gap-3">
        {data.wallets.map((wallet) => (
          <InvestmentWalletCard
            key={wallet.id}
            wallet={wallet}
            onUpdateBalance={onUpdateBalance}
            onAddFunds={onAddFunds}
            onOpenHistory={setHistoryFor}
          />
        ))}
      </ul>

      <ValuationHistorySheet
        wallet={historyFor}
        onClose={() => setHistoryFor(null)}
      />
    </div>
  );
}
