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
      <div className="modal-box bg-surface border-t border-outline/10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-outline/30"
          aria-hidden="true"
        />
        {title && (
          <h3 className="mb-4 text-base font-bold text-on-surface">{title}</h3>
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
