import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { TOAST_DURATION_MS, toastReducer } from '@/shared/lib';

interface ToastApi {
  showToast: (message: string) => void;
}

// Without a provider (tests, prerender) showing a toast does nothing.
const ToastContext = createContext<ToastApi>({ showToast: () => undefined });

export function useToast(): ToastApi {
  return useContext(ToastContext);
}

/** Shows one short success message at a time above the bottom navigation. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, dispatch] = useReducer(toastReducer, null);
  const nextId = useRef(0);

  const showToast = useCallback((message: string) => {
    nextId.current += 1;
    dispatch({ type: 'show', id: nextId.current, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(
      () => dispatch({ type: 'dismiss', id: toast.id }),
      TOAST_DURATION_MS
    );
    return () => clearTimeout(timer);
  }, [toast]);

  const api = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* The live region stays mounted so screen readers announce each new message. */}
      <div
        role="status"
        aria-live="polite"
        className="toast toast-center z-50 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] pointer-events-none"
      >
        {toast && (
          <div
            key={toast.id}
            className="alert alert-success alert-soft text-sm"
          >
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
