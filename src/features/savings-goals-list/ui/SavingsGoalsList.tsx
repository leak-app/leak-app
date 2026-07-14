export function SavingsGoalsList() {
  const goals = [
    {
      title: 'Emergency Fund',
      current: '$8,500',
      target: '$10,000',
      percentage: 85,
      color: 'var(--primary)',
    },
    {
      title: 'New Macbook Pro',
      current: '$1,200',
      target: '$2,500',
      percentage: 48,
      color: 'var(--secondary)',
    },
    {
      title: 'Tokyo Trip',
      current: '$3,000',
      target: '$5,000',
      percentage: 60,
      color: 'var(--primary)',
    },
  ];

  return (
    <div className="flex-1 flex flex-col mt-4 gap-6">
      {/* Overall Status Card */}
      <div className="p-5 rounded-3xl bg-surface border border-outline/10 flex flex-col shadow-lg">
        <span className="text-xs text-on-surface-variant font-medium text-left">
          Total Savings Progress
        </span>
        <div className="mt-3 flex items-baseline gap-1 select-all">
          <span className="text-3xl font-bold text-on-surface">$12,700</span>
          <span className="text-sm text-on-surface-variant font-mono">
            / $17,500
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2.5 rounded-full bg-surface-bright overflow-hidden">
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all duration-500"
            style={{ width: '72%' }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-on-surface-variant select-none">
          <span>72.5% Achieved</span>
          <span className="text-primary font-mono font-bold">
            +$450 this month
          </span>
        </div>
      </div>

      {/* Goals List Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between select-none">
          <h2 className="text-lg font-bold text-on-surface">Active Goals</h2>
          <button className="text-xs text-primary font-semibold hover:underline">
            + Add Goal
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {goals.map((goal, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-surface/50 border border-outline/5 hover:border-outline/10 flex flex-col transition-all cursor-pointer hover:bg-surface/75"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface">
                  {goal.title}
                </span>
                <div className="flex items-baseline gap-0.5 font-mono text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">
                    {goal.current}
                  </span>
                  <span>/ {goal.target}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full h-2 rounded-full bg-surface-bright overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${goal.percentage}%`,
                    backgroundColor: goal.color,
                    boxShadow: `0 0 8px ${goal.color}35`,
                  }}
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                <span>{goal.percentage}% Completed</span>
                <span className="hover:underline font-sans cursor-pointer font-semibold text-primary">
                  Configure
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
