export interface OnboardingStateModel {
  currentStepIndex: number;
  isCompleted: boolean;
  hasHydrated: boolean;
}

export interface OnboardingActionsModel {
  setHasHydrated: (hydrated: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}
