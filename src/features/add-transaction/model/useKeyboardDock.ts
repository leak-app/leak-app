import { useEffect, useState } from 'react';

import { isTextEntryField, keyboardInset } from '../lib/keyboardDock';

interface KeyboardDockModel {
  /** A text field has focus, so the phone's keyboard is (or is about to be) open. */
  isTyping: boolean;
  /** Pixels to lift the bottom bar so the keyboard does not cover it. */
  inset: number;
}

/** Tracks the system keyboard through focus, which is more reliable than measuring the screen. */
export function useKeyboardDock(): KeyboardDockModel {
  const [isTyping, setIsTyping] = useState(false);
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) =>
      setIsTyping(isTextEntryField(event.target as HTMLElement | null));
    // Focus moving from one field to another fires out then in; only a real exit ends typing.
    const onFocusOut = (event: FocusEvent) =>
      setIsTyping(isTextEntryField(event.relatedTarget as HTMLElement | null));

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const measure = () =>
      setInset(
        keyboardInset(
          document.documentElement.clientHeight,
          viewport.height,
          viewport.offsetTop
        )
      );
    measure();
    viewport.addEventListener('resize', measure);
    viewport.addEventListener('scroll', measure);
    return () => {
      viewport.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', measure);
    };
  }, []);

  return { isTyping, inset: isTyping ? inset : 0 };
}
