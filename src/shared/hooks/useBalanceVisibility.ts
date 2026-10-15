import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const BALANCE_VISIBILITY_STORAGE_KEY = 'leak_balance_visibility';

/** Shown in place of an amount while balances are hidden. */
export const MASKED_AMOUNT = '••••••';

interface BalanceVisibilityStoreModel {
  /** When true, screens show masked dots instead of money. */
  isHidden: boolean;
  toggle: () => void;
}

const useBalanceVisibilityStore = create<BalanceVisibilityStoreModel>()(
  persist(
    (set) => ({
      isHidden: false,
      toggle: () => set((state) => ({ isHidden: !state.isHidden })),
    }),
    {
      name: BALANCE_VISIBILITY_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/** One setting for every screen that shows balances; remembered on this device. */
export function useBalanceVisibility() {
  const isHidden = useBalanceVisibilityStore((state) => state.isHidden);
  const toggle = useBalanceVisibilityStore((state) => state.toggle);
  return {
    isHidden,
    toggle,
    /** The text itself, or dots while balances are hidden. */
    mask: (text: string) => (isHidden ? MASKED_AMOUNT : text),
  };
}
