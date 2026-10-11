import { Select, type SelectOption } from '@/shared/ui';

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
  const monthOptions: SelectOption<number>[] = Array.from(
    { length: 12 },
    (_, i) => ({ value: i + 1, label: `Tháng ${i + 1}` })
  );
  const yearOptions: SelectOption<number>[] = Array.from(
    { length: 5 },
    (_, i) => ({
      value: currentYear - 2 + i,
      label: `Năm ${currentYear - 2 + i}`,
    })
  );

  return (
    <div className="flex items-center gap-2">
      <Select
        variant="pill"
        ariaLabel="Chọn tháng"
        value={month}
        options={monthOptions}
        onChange={onMonthChange}
      />
      <Select
        variant="pill"
        ariaLabel="Chọn năm"
        value={year}
        options={yearOptions}
        onChange={onYearChange}
      />
    </div>
  );
};
