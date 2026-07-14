export function WalletList() {
  const wallets = [
    {
      name: 'Primary Checking',
      bank: 'Chase Bank',
      balance: '$12,450.80',
      type: 'Fiat',
      lastUpdated: 'Updated 2m ago',
      color: 'var(--primary)',
    },
    {
      name: 'Crypto Cold Wallet',
      bank: 'Ledger Nano X',
      balance: '$8,500.00',
      type: 'Crypto',
      lastUpdated: 'Updated 10m ago',
      color: 'var(--secondary)',
    },
    {
      name: 'Savings Vault',
      bank: 'Ally Bank',
      balance: '$2,050.10',
      type: 'Fiat',
      lastUpdated: 'Updated 1d ago',
      color: 'var(--primary)',
    },
  ];

  return (
    <div className="flex-1 flex flex-col mt-4 gap-6">
      {/* Wallet total balance Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-surface to-surface-bright border border-outline/15 shadow-xl flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
        <span className="text-xs text-on-surface-variant font-medium text-left">
          Total Balance
        </span>
        <span className="text-4xl font-bold text-on-surface mt-2 select-all font-currency">
          $23,000.90
        </span>
        <div className="mt-4 flex items-center gap-3 text-xs text-on-surface-variant select-none">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-vibrant-green" />
            <span>2 Fiat Accounts</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-electric-cyan" />
            <span>1 Crypto Wallet</span>
          </div>
        </div>
      </div>

      {/* Wallets list */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between select-none">
          <h2 className="text-lg font-bold text-on-surface">
            Accounts & Wallets
          </h2>
          <button className="text-xs text-primary font-semibold hover:underline">
            + Link Account
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {wallets.map((wallet, i) => (
            <div
              key={i}
              className="p-4.5 rounded-2xl bg-surface/50 border border-outline/5 hover:border-outline/10 flex items-center justify-between transition-all cursor-pointer hover:bg-surface/75"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: `${wallet.color}20`,
                    color: wallet.color,
                    border: `1px solid ${wallet.color}35`,
                  }}
                >
                  {wallet.type === 'Crypto' ? '₿' : '$'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-on-surface">
                    {wallet.name}
                  </span>
                  <span className="text-[11px] text-on-surface-variant mt-0.5">
                    {wallet.bank}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-sm font-bold text-on-surface font-currency select-all">
                  {wallet.balance}
                </span>
                <span className="text-[10px] text-on-surface-variant mt-0.5 font-mono">
                  {wallet.lastUpdated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
