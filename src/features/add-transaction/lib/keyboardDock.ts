/** The few element properties that decide whether focus opens the system keyboard. */
export interface FocusTargetLike {
  tagName?: string;
  type?: string;
  readOnly?: boolean;
  isContentEditable?: boolean;
}

const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
]);

/** True when focusing this element brings up the phone's own keyboard. */
export function isTextEntryField(target: FocusTargetLike | null): boolean {
  if (!target) return false;
  if (target.isContentEditable) return true;
  if (target.tagName === 'TEXTAREA') return !target.readOnly;
  if (target.tagName !== 'INPUT') return false;
  return !target.readOnly && !NON_TEXT_INPUT_TYPES.has(target.type ?? 'text');
}

/**
 * How far a bottom bar must be lifted to stay above the keyboard. Android shrinks the
 * layout viewport itself (inset 0); iOS only shrinks the visual one, hiding the bar.
 */
export function keyboardInset(
  layoutHeight: number,
  visualHeight: number,
  visualOffsetTop: number
): number {
  return Math.max(0, Math.round(layoutHeight - visualHeight - visualOffsetTop));
}
