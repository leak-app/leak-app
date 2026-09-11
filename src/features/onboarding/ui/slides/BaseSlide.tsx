import type { ReactNode } from 'react';

export interface BaseSlideProps {
  illustration: ReactNode;
  title: string;
  description: string;
}

export function BaseSlide({
  illustration,
  title,
  description,
}: BaseSlideProps) {
  return (
    <article className="flex h-full w-full select-none flex-col items-center justify-between px-6 py-4">
      {/* Illustration Area */}
      <div className="flex w-full flex-1 items-center justify-center py-6">
        {illustration}
      </div>

      {/* Typography Content */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">
          {title}
        </h2>
        <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-on-surface-variant">
          {description}
        </p>
      </div>
    </article>
  );
}
