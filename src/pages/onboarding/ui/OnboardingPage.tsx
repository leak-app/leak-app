import { OnboardingCarousel } from '@/features/onboarding';

export default function OnboardingPage() {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-0 py-0">
      {/* Ambient Lighting Orbs */}
      <div
        className="pointer-events-none absolute top-[-10%] left-[-10%] h-105 w-105 rounded-full bg-primary opacity-[0.06] blur-[7.5rem]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-105 w-105 rounded-full bg-secondary opacity-[0.06] blur-[7.5rem]"
        aria-hidden="true"
      />

      {/* Mobile-first Safe Area Container */}
      <div className="flex h-dvh w-full max-w-md flex-col justify-between pt-safe pb-safe">
        <OnboardingCarousel />
      </div>
    </main>
  );
}
