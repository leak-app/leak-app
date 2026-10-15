import { clsx } from 'clsx';
import { useEffect, useRef, type ReactNode } from 'react';

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

/** DaisyUI bottom modal driven by the `open` prop. Children mount only while open. */
export function BottomSheet({
  open,
  onClose,
  title,
  ariaLabel,
  size = 'auto',
  children,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      onClose={onClose}
    >
      <div
        className={clsx(
          'modal-box rounded-t-sheet border-t border-border bg-sheet px-6 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]',
          size === 'tall' &&
            'flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] flex-col'
        )}
      >
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20"
          aria-hidden="true"
        />
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
