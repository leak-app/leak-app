/** Three budget bars in three states: the empty card's picture. */
export function BudgetEmptyIllustration() {
  return (
    <svg
      width="140"
      height="84"
      viewBox="0 0 140 84"
      aria-hidden="true"
    >
      <rect
        x="16"
        y="14"
        width="108"
        height="10"
        rx="5"
        className="fill-track"
      />
      <rect
        x="16"
        y="14"
        width="44"
        height="10"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="16"
        y="38"
        width="108"
        height="10"
        rx="5"
        className="fill-track"
      />
      <rect
        x="16"
        y="38"
        width="76"
        height="10"
        rx="5"
        className="fill-secondary opacity-80"
      />
      <rect
        x="16"
        y="62"
        width="108"
        height="10"
        rx="5"
        className="fill-track"
      />
      <rect
        x="16"
        y="62"
        width="24"
        height="10"
        rx="5"
        className="fill-pebble opacity-60"
      />
    </svg>
  );
}
