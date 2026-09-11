import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { OnboardingActionsModel, OnboardingStateModel } from './types';

export interface OnboardingStoreModel
  extends OnboardingStateModel, OnboardingActionsModel {}

export const ONBOARDING_STORAGE_KEY = 'leak_onboarding_storage';
export const TOTAL_ONBOARDING_STEPS = 6;

export const useOnboardingStore = create<OnboardingStoreModel>()(
  persist(
    (set, get) => ({
      currentStepIndex: 0,
      isCompleted: false,
      hasHydrated: false,

      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),

      nextStep: () => {
        const { currentStepIndex, isCompleted } = get();
        if (currentStepIndex < TOTAL_ONBOARDING_STEPS - 1) {
          set({ currentStepIndex: currentStepIndex + 1 });
        } else if (!isCompleted) {
          set({ isCompleted: true });
        }
      },

      prevStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 });
        }
      },

      goToStep: (index: number) => {
        if (index >= 0 && index < TOTAL_ONBOARDING_STEPS) {
          set({ currentStepIndex: index });
        }
      },

      skipOnboarding: () => {
        set({
          currentStepIndex: TOTAL_ONBOARDING_STEPS - 1,
          isCompleted: true,
        });
      },

      completeOnboarding: () => {
        set({ isCompleted: true });
      },

      resetOnboarding: () => {
        set({ currentStepIndex: 0, isCompleted: false });
      },
    }),
    {
      name: ONBOARDING_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isCompleted: state.isCompleted,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
