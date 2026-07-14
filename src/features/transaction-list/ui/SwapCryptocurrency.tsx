export function SwapCryptocurrency() {
  return (
    <div className="flex-1 flex flex-col mt-4">
      {/* Swap Form Container */}
      <div className="relative flex flex-col gap-1.5">
        {/* You Pay Card */}
        <div className="p-5 rounded-3xl bg-surface border border-outline-variant/60 flex flex-col">
          <span className="text-xs text-on-surface-variant font-medium text-left">
            You pay
          </span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-display-currency-mobile text-on-surface font-semibold select-all leading-none">
              $0
            </span>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-bright border border-outline/10 text-on-surface hover:bg-surface-container-highest transition-colors select-none font-semibold">
              <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold font-mono">
                S
              </span>
              <span className="text-sm">SOL</span>
              <svg
                className="w-3.5 h-3.5 text-on-surface-variant"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>1.234 sol</span>
            </div>
            <span>0 SOL</span>
          </div>
        </div>

        {/* Swap Middle Switch Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button className="w-11 h-11 rounded-full bg-[#1b231c] border-2 border-background text-[#ff9900] flex items-center justify-center hover:bg-surface-bright active:scale-90 transition-all shadow-md group">
            <svg
              className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* You Receive Card */}
        <div className="p-5 rounded-3xl bg-surface border border-outline-variant/60 flex flex-col">
          <span className="text-xs text-on-surface-variant font-medium text-left">
            You receive
          </span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-display-currency-mobile text-on-surface font-semibold select-all leading-none">
              $0
            </span>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-bright border border-outline/10 text-on-surface hover:bg-surface-container-highest transition-colors select-none font-semibold">
              <span className="w-5 h-5 rounded-full bg-[#2775CA]/20 flex items-center justify-center text-[#2775CA] text-xs font-bold font-mono">
                $
              </span>
              <span className="text-sm">USDC</span>
              <svg
                className="w-3.5 h-3.5 text-on-surface-variant"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-end text-xs text-on-surface-variant font-mono">
            <span>0 USDC</span>
          </div>
        </div>
      </div>

      {/* Quick Percentages and Continue Button */}
      <div className="mt-6 flex items-center gap-3">
        {['25%', '50%', 'Max'].map((val, i) => (
          <button
            key={i}
            className="flex-1 py-3 px-4 rounded-full bg-surface hover:bg-surface-bright active:scale-95 transition-all text-sm font-semibold border border-outline/5 text-on-surface"
          >
            {val}
          </button>
        ))}
        <button className="flex-[2] py-3 px-6 rounded-full bg-primary hover:bg-primary-hover active:scale-95 transition-all text-on-primary font-bold text-sm shadow-md">
          Continue
        </button>
      </div>

      {/* Numpad Container */}
      <div className="mt-8 grid grid-cols-3 gap-y-3 gap-x-4 select-none">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '✕'].map((val, i) => (
          <button
            key={i}
            className="py-4 rounded-2xl bg-surface/50 hover:bg-surface border border-outline/5 active:scale-95 transition-all text-on-surface text-xl font-semibold flex items-center justify-center"
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
