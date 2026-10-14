import { Link, Navigate } from 'react-router-dom';

import { useAuthStore } from '@/entities/auth';
import { usePageTitle } from '@/shared/hooks';
import {
  ChartColumnIcon,
  HistoryIcon,
  LeakLogoIcon,
  PencilIcon,
  ShieldCheckIcon,
  TargetIcon,
  TrendingDownIcon,
  type IconComponent,
} from '@/shared/icons';
import { PublicLayout } from '@/shared/layout';
import { PUBLIC_PATHS } from '@/shared/routing';
import { buttonStyles, Card } from '@/shared/ui';

import {
  HOME_FEATURES,
  HOME_FEATURES_HEADING,
  HOME_GOOGLE_DATA,
  HOME_HERO,
  HOME_PAGE_TITLE,
  HOME_PRIVACY_NOTE,
  HOME_PURPOSE,
  type HomeFeatureIcon,
} from '../model/content';

const FEATURE_ICON: Record<HomeFeatureIcon, IconComponent> = {
  pencil: PencilIcon,
  history: HistoryIcon,
  leak: TrendingDownIcon,
  target: TargetIcon,
  sheets: ChartColumnIcon,
  shield: ShieldCheckIcon,
};

/** Public landing page. Signed-in users go straight to the app. */
export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  usePageTitle(HOME_PAGE_TITLE);

  // The landing content is rendered immediately (it is also pre-rendered into the
  // static HTML), so visitors and crawlers never wait on the session check.
  if (user) {
    return (
      <Navigate
        to="/overview"
        replace
      />
    );
  }

  return (
    <PublicLayout>
      <section className="flex flex-col items-start gap-5 py-10">
        <span className="flex size-disc items-center justify-center rounded-full bg-primary-tint text-primary">
          <LeakLogoIcon
            size={24}
            aria-hidden="true"
          />
        </span>
        <h1 className="text-[2rem] font-semibold leading-tight text-text">
          {HOME_HERO.heading}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-soft">
          {HOME_HERO.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className={buttonStyles({ variant: 'primary', size: 'lg' })}
          >
            {HOME_HERO.primaryAction}
          </Link>
          <Link
            to="/login"
            className={buttonStyles({ variant: 'secondary', size: 'lg' })}
          >
            {HOME_HERO.secondaryAction}
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="home-purpose-heading"
        className="flex flex-col gap-3 py-6"
      >
        <h2
          id="home-purpose-heading"
          className="text-xl font-semibold text-text"
        >
          {HOME_PURPOSE.heading}
        </h2>
        {HOME_PURPOSE.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-base leading-relaxed text-soft"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section
        aria-labelledby="home-features-heading"
        className="flex flex-col gap-4 py-6"
      >
        <h2
          id="home-features-heading"
          className="text-xl font-semibold text-text"
        >
          {HOME_FEATURES_HEADING}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {HOME_FEATURES.map((feature) => {
            const Icon = FEATURE_ICON[feature.icon];
            return (
              <li key={feature.id}>
                <Card className="flex h-full flex-col gap-3">
                  <Icon
                    size={24}
                    className="text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-semibold text-text">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-soft">
                    {feature.description}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="home-google-data-heading"
        className="flex flex-col gap-3 py-6"
      >
        <h2
          id="home-google-data-heading"
          className="text-xl font-semibold text-text"
        >
          {HOME_GOOGLE_DATA.heading}
        </h2>
        <p className="text-base leading-relaxed text-soft">
          {HOME_GOOGLE_DATA.text}
        </p>
      </section>

      <p className="py-6 text-base leading-relaxed text-soft">
        {HOME_PRIVACY_NOTE.text}{' '}
        <Link
          to={PUBLIC_PATHS.privacy}
          className="font-semibold text-primary hover:underline"
        >
          {HOME_PRIVACY_NOTE.privacyLabel}
        </Link>{' '}
        {HOME_PRIVACY_NOTE.and}{' '}
        <Link
          to={PUBLIC_PATHS.terms}
          className="font-semibold text-primary hover:underline"
        >
          {HOME_PRIVACY_NOTE.termsLabel}
        </Link>
        .
      </p>
    </PublicLayout>
  );
}
