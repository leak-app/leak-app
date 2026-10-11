import { useEffect, useRef, type ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/** DaisyUI bottom modal driven by the `open` prop. Children mount only while open. */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom"
      aria-label={title}
      onClose={onClose}
    >
      <div className="modal-box rounded-t-sheet border-t border-border bg-sheet px-6 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20"
          aria-hidden="true"
        />
        {title && (
          <h3 className="mb-4 text-section-title text-text">{title}</h3>
        )}
        {open && children}
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
