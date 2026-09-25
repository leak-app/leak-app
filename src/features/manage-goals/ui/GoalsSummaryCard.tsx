import type { GoalsSummaryModel } from '@/entities/goal';

export function GoalsSummaryCard({ summary }: { summary: GoalsSummaryModel }) {
  return (
    <div className="card bg-surface border border-outline/10 rounded-3xl p-5 shadow-lg gap-3">
      <span className="text-xs font-medium text-on-surface-variant">
        Đã tiết kiệm
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-on-surface tabular-nums">
          {summary.savedText}
        </span>
        <span className="text-sm text-on-surface-variant tabular-nums">
          {summary.targetText}
        </span>
      </div>
      <progress
        className="progress progress-primary w-full"
        value={summary.percent}
        max={100}
        aria-label={summary.percentText}
      />
      <div className="flex justify-between text-xs text-on-surface-variant">
        <span>{summary.percentText}</span>
        {summary.completedText && <span>{summary.completedText}</span>}
      </div>
    </div>
  );
}
