interface Props {
  insightText: string;
}

export const SavingsInsightCard = ({ insightText }: Props) => {
  return (
    <div className="card glass-card p-5 rounded-2xl flex flex-col justify-between overflow-hidden relative border border-primary/20 bg-gradient-to-br from-surface-container/80 to-surface-container-high/40 shadow-lg">
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <span>💡</span>
          <h3>Gợi ý tiết kiệm</h3>
        </div>
        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
          {insightText}
        </p>
      </div>

      {/* Ambient background glow */}
      <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-primary/10 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
};
