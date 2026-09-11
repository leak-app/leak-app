import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Swiper as SwiperCore } from 'swiper';
import { A11y, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  TOTAL_ONBOARDING_STEPS,
  useOnboardingStore,
} from '../model/onboardingStore';
import { NavigationControls } from './NavigationControls';
import {
  ClearInsightsSlide,
  LogOutcomesSlide,
  QuickLoggingSlide,
  StartJourneySlide,
  TrackSpendsSlide,
  WelcomeSlide,
} from './slides';

const SLIDE_TITLES = [
  'Chào mừng đến với Leak App',
  'Theo dõi Chi tiêu',
  'Đánh giá Giá trị',
  'Báo cáo Trực quan',
  'Ghi chép Nhanh chóng',
  'Bắt đầu Hành trình',
] as const;

export function OnboardingCarousel() {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  const currentStepIndex = useOnboardingStore((s) => s.currentStepIndex);
  const goToStep = useOnboardingStore((s) => s.goToStep);
  const skipOnboarding = useOnboardingStore((s) => s.skipOnboarding);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const isFinalStep = currentStepIndex === TOTAL_ONBOARDING_STEPS - 1;

  const handleNext = useCallback(() => {
    if (isFinalStep) {
      completeOnboarding();
      navigate('/login', { replace: true });
    } else {
      swiperRef.current?.slideNext();
    }
  }, [completeOnboarding, isFinalStep, navigate]);

  const handleBack = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleSkip = useCallback(() => {
    skipOnboarding();
    navigate('/login', { replace: true });
  }, [navigate, skipOnboarding]);

  // Sync external index changes (e.g. store updates) with Swiper
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.activeIndex !== currentStepIndex
    ) {
      swiperRef.current.slideTo(currentStepIndex);
    }
  }, [currentStepIndex]);

  // Keyboard shortcut for Escape -> Skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  return (
    <section
      className="flex h-full w-full flex-1 flex-col justify-between"
      role="region"
      aria-roledescription="carousel"
      aria-label="Giới thiệu ứng dụng Leak"
    >
      {/* Live Region for Screen Readers */}
      <div
        className="sr-only"
        aria-live="polite"
      >
        {`Trang ${currentStepIndex + 1} trên ${TOTAL_ONBOARDING_STEPS}: ${SLIDE_TITLES[currentStepIndex] ?? ''}`}
      </div>

      {/* Top Header: Progress Indicator & Skip Button */}
      <header className="flex w-full items-center justify-between px-6 pt-6 pb-2">
        <div
          ref={setPaginationEl}
          className="inline-flex items-center gap-2"
          role="tablist"
          aria-label="Tiến trình giới thiệu"
        />

        {!isFinalStep ? (
          <button
            type="button"
            onClick={handleSkip}
            className="btn btn-ghost min-h-[44px] min-w-[44px] px-3 text-xs font-medium text-hint hover:text-default"
          >
            Bỏ qua
          </button>
        ) : (
          <div className="min-h-[44px] min-w-[44px]" />
        )}
      </header>

      {/* Swiper Carousel Sliding Viewport */}
      <div className="min-h-0 w-full flex-1 overflow-hidden">
        <Swiper
          modules={[Pagination, Keyboard, A11y]}
          pagination={{
            el: paginationEl,
            clickable: true,
            renderBullet: (index, className) =>
              `<button type="button" class="${className}" aria-label="Trang ${index + 1}"></button>`,
          }}
          keyboard={{
            enabled: true,
          }}
          spaceBetween={0}
          slidesPerView={1}
          speed={350}
          initialSlide={currentStepIndex}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            goToStep(swiper.activeIndex);
          }}
          className="h-full w-full"
        >
          <SwiperSlide className="h-full w-full">
            <WelcomeSlide />
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <TrackSpendsSlide />
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <LogOutcomesSlide />
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <ClearInsightsSlide />
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <QuickLoggingSlide />
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <StartJourneySlide />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Bottom Controls */}
      <footer className="w-full px-6 pt-2 pb-8">
        <NavigationControls
          primaryLabel={isFinalStep ? 'Bắt đầu ngay' : 'Tiếp tục'}
          isFinalStep={isFinalStep}
          canGoBack={currentStepIndex > 0}
          onNext={handleNext}
          onBack={handleBack}
        />
      </footer>
    </section>
  );
}
