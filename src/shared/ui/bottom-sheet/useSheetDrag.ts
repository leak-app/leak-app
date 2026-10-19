import { useRef, type PointerEvent, type RefObject } from 'react';

/** Drag distance (px) past which releasing the handle dismisses the sheet. */
const DISMISS_DISTANCE = 100;
/** A quick flick (px/ms) dismisses after a shorter drag. */
const DISMISS_VELOCITY = 0.5;
const MIN_FLICK_DISTANCE = 30;
const SETTLE_MS = 200;

/**
 * Lets the user drag a sheet down by its handle. The sheet follows the finger and
 * either slides away (then `dismiss` runs) or springs back. Position is written
 * straight to the element, so a drag does not re-render the sheet.
 */
export function useSheetDrag(
  sheetRef: RefObject<HTMLElement | null>,
  dismiss: () => void
) {
  const drag = useRef<{ startY: number; startTime: number; dy: number } | null>(
    null
  );

  const move = (sheet: HTMLElement, offset: number, animate: boolean) => {
    sheet.style.transition = animate
      ? `transform ${SETTLE_MS}ms ease-out`
      : 'none';
    sheet.style.transform = `translateY(${offset}px)`;
  };

  const reset = () => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transition = '';
    sheet.style.transform = '';
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      startY: event.clientY,
      startTime: event.timeStamp,
      dy: 0,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const sheet = sheetRef.current;
    if (!drag.current || !sheet) return;
    // Only downward: dragging up would pull the sheet off its bottom edge.
    drag.current.dy = Math.max(0, event.clientY - drag.current.startY);
    move(sheet, drag.current.dy, false);
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const sheet = sheetRef.current;
    const current = drag.current;
    drag.current = null;
    if (!current || !sheet) return;

    const elapsed = Math.max(event.timeStamp - current.startTime, 1);
    const isFlick =
      current.dy > MIN_FLICK_DISTANCE &&
      current.dy / elapsed > DISMISS_VELOCITY;

    if (current.dy > DISMISS_DISTANCE || isFlick) {
      move(sheet, sheet.offsetHeight, true);
      window.setTimeout(() => {
        dismiss();
        reset();
      }, SETTLE_MS);
    } else {
      move(sheet, 0, true);
      window.setTimeout(reset, SETTLE_MS);
    }
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
}
