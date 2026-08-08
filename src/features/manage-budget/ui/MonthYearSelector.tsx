interface Props {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export const MonthYearSelector = ({
  month,
  year,
  onMonthChange,
  onYearChange,
}: Props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <select
        aria-label="Chọn tháng"
        value={month}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="select select-sm border-outline/20 bg-surface-container-high text-on-surface focus:outline-none focus:border-primary rounded-xl font-medium"
      >
        {months.map((m) => (
          <option
            key={m}
            value={m}
          >
            Tháng {m}
          </option>
        ))}
      </select>

      <select
        aria-label="Chọn năm"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="select select-sm border-outline/20 bg-surface-container-high text-on-surface focus:outline-none focus:border-primary rounded-xl font-medium"
      >
        {years.map((y) => (
          <option
            key={y}
            value={y}
          >
            Năm {y}
          </option>
        ))}
      </select>
    </div>
  );
};
