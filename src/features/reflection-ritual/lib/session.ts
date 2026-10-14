export interface ProgressView {
  /** Segments for a short queue, one continuous bar for a long one. */
  mode: 'segments' | 'bar';
  total: number;
  /** How many segments are lit, including the current item. */
  filled: number;
  percent: number;
  /** For screen readers, for example "Khoản 2 trên 4". */
  label: string;
  /** For the eye, for example "2 / 4". */
  counter: string;
}

const MAX_SEGMENTS = 10;

/** `index` is the zero-based position of the item on screen. */
export function progressView(index: number, total: number): ProgressView {
  const current = Math.min(index + 1, total);
  return {
    mode: total <= MAX_SEGMENTS ? 'segments' : 'bar',
    total,
    filled: current,
    percent: total === 0 ? 0 : Math.round((current / total) * 100),
    label: `Khoản ${current} trên ${total}`,
    counter: `${current} / ${total}`,
  };
}

/** The last item says it is the last, so "Tiếp theo" never promises another card. */
export function nextLabel(index: number, total: number): string {
  return index >= total - 1 ? 'Hoàn tất' : 'Tiếp theo';
}
