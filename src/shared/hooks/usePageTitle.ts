import { useEffect } from 'react';

/** Sets the browser tab title while the page is mounted, then restores the previous one. */
export function usePageTitle(title: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
