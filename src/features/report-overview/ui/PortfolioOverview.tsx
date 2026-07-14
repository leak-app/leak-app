export function PortfolioOverview() {
  const cryptoAssets = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '$142,832.13',
      change: '-0.67%',
      isPositive: false,
      color: '#F7931A',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: '$45,832.13',
      change: '-0.62%',
      isPositive: false,
      color: '#627EEA',
    },
    {
      name: 'XRP',
      symbol: 'XRP',
      price: '$45,832.13',
      change: '-0.62%',
      isPositive: false,
      color: '#23292F',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Portfolio Value Section */}
      <div className="mt-4 flex flex-col items-start">
        <div className="flex items-center gap-1.5 text-on-surface-variant text-sm select-none">
          <span>Portfolio value</span>
          <svg
            className="w-4 h-4 text-on-surface-variant"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        <div className="mt-1 flex items-baseline select-all">
          <span className="text-display-currency text-on-surface">$23,000</span>
          <span className="text-display-currency text-on-surface/50 font-medium">
            .90
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-primary text-sm font-semibold select-none cursor-pointer hover:underline">
          <span className="text-vibrant-green font-mono">
            +$214.21 (+1.47%)
          </span>
          <svg
            className="w-3 h-3 text-vibrant-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          {
            label: 'Deposit',
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            ),
          },
          {
            label: 'Withdraw',
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            ),
          },
          {
            label: 'Transfer',
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            ),
          },
          {
            label: 'More',
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            ),
          },
        ].map((action, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 group focus:outline-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface border border-outline/10 flex items-center justify-center text-on-surface group-hover:bg-surface-bright group-active:scale-95 transition-all shadow-md">
              <svg
                className="w-6 h-6 text-on-surface group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {action.icon}
              </svg>
            </div>
            <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Floating Card Promo Section */}
      <div className="mt-8 flex gap-4 overflow-x-auto scrollbar-none pb-2 select-none">
        <div className="min-w-[210px] flex-1 p-4 rounded-3xl bg-gradient-to-br from-surface to-[#1e1b15] border border-outline/10 flex items-center justify-between shadow-lg">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">
              Bitcoin
            </span>
            <span className="text-lg font-bold text-on-surface mt-1">
              $14, 047.13
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#F7931A]/20 flex items-center justify-center text-[#F7931A] font-bold text-sm">
            ₿
          </div>
        </div>

        <div className="min-w-[210px] flex-1 p-4 rounded-3xl bg-gradient-to-br from-surface to-[#151c24] border border-outline/10 flex items-center justify-between shadow-lg">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">
              Ethereum
            </span>
            <span className="text-lg font-bold text-on-surface mt-1">
              $3, 140.22
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#627EEA]/20 flex items-center justify-center text-[#627EEA] font-bold text-sm">
            Ξ
          </div>
        </div>
      </div>

      {/* Markets Section */}
      <div className="mt-8 flex flex-col">
        <div className="flex items-center justify-between select-none">
          <h2 className="text-headline-md text-on-surface font-semibold">
            Markets
          </h2>
        </div>

        {/* Tab filters */}
        <div className="mt-4 flex items-center gap-3 select-none">
          <button className="px-4 py-2 rounded-full bg-surface-bright text-on-surface text-xs font-semibold border border-outline/10 shadow-sm">
            Watchlist
          </button>
          <button className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
            Top gainers
          </button>
          <button className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-medium transition-colors">
            Top losers
          </button>
          <button className="ml-auto w-8 h-8 rounded-full bg-surface border border-outline/10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>

        {/* Asset List */}
        <div className="mt-6 flex flex-col gap-4">
          {cryptoAssets.map((asset, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-surface/30 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={{
                    backgroundColor: `${asset.color}30`,
                    color: asset.color,
                  }}
                >
                  {asset.symbol === 'BTC'
                    ? '₿'
                    : asset.symbol === 'ETH'
                      ? 'Ξ'
                      : '✕'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-on-surface">
                    {asset.name}
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono uppercase">
                    {asset.symbol}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-sm font-bold text-on-surface select-all">
                  {asset.price}
                </span>
                <span className="text-xs text-tertiary font-medium font-mono mt-0.5">
                  {asset.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
