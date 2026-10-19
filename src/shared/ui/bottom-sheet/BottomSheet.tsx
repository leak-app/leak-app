import { clsx } from 'clsx';
import { useEffect, useRef, type ReactNode } from 'react';

import { useSheetDrag } from './useSheetDrag';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Spoken name of the dialog when it has no visible `title`. */
  ariaLabel?: string;
  /**
   * `auto` is as high as its content. `tall` fills the screen below a small gap,
   * for forms with a numpad: the children then get a flex column and may push a
   * footer down with `mt-auto`.
   */
  size?: 'auto' | 'tall';
  children: ReactNode;
}

/**
 * DaisyUI bottom modal driven by the `open` prop. Children mount only while open.
 * Dragging the handle down dismisses it, like Escape or a tap on the backdrop.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  ariaLabel,
  size = 'auto',
  children,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const handleDrag = useSheetDrag(boxRef, () => dialogRef.current?.close());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() focuses the first control; a field can ask to be focused instead.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom"
      aria-label={title ?? ariaLabel}
      // React's onClose bubbles, unlike the browser's: a sheet opened inside
      // another one must not close its parent when it closes itself.
      onClose={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={boxRef}
        className={clsx(
          'modal-box rounded-t-sheet border-t border-border bg-sheet px-6 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]',
          size === 'tall' &&
            'flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] flex-col'
        )}
      >
        {/* The grab area is 44px tall; only the bar inside it is drawn. */}
        <div
          className="-mt-4 -mb-2 flex h-11 cursor-grab touch-none items-start justify-center pt-4 active:cursor-grabbing"
          aria-hidden="true"
          {...handleDrag}
        >
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        {title && (
          <h3 className="mb-4 text-section-title text-text">{title}</h3>
        )}
        {open &&
          (size === 'tall' ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              {children}
            </div>
          ) : (
            children
          ))}
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
      >
        <button type="submit">Đóng</button>
      </form>
    </dialog>
  );
}
