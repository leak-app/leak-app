import { useEffect, useRef, useState } from 'react';

export interface UseLoadGsiScriptOptions {
  /**
   * Nonce applied to GSI script tag. Propagates to GSI's inline style tag
   */
  nonce?: string;
  /**
   * ISO-639 code of [locale](https://developers.google.com/identity/gsi/web/reference/js-reference#locale) to use for content
   */
  locale?: string;
  /**
   * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
   */
  onScriptLoadSuccess?: () => void;
  /**
   * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
   */
  onScriptLoadError?: () => void;
  /**
   * Whether to disable loading the script
   */
  disabled?: boolean;
}

export default function useLoadGsiScript(
  options: UseLoadGsiScriptOptions = {}
): boolean {
  const { nonce, locale, onScriptLoadSuccess, onScriptLoadError, disabled } =
    options;

  const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] =
    useState(false);

  const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
  // eslint-disable-next-line react-hooks/refs
  onScriptLoadSuccessRef.current = onScriptLoadSuccess;

  const onScriptLoadErrorRef = useRef(onScriptLoadError);
  // eslint-disable-next-line react-hooks/refs
  onScriptLoadErrorRef.current = onScriptLoadError;

  useEffect(() => {
    if (disabled) {
      return;
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://accounts.google.com/gsi/client';
    if (locale) scriptTag.src += `?hl=${locale}`;
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.nonce = nonce;
    scriptTag.onload = () => {
      setScriptLoadedSuccessfully(true);
      onScriptLoadSuccessRef.current?.();
    };
    scriptTag.onerror = () => {
      setScriptLoadedSuccessfully(false);
      onScriptLoadErrorRef.current?.();
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
      setScriptLoadedSuccessfully(false);
    };
  }, [locale, nonce, disabled]);

  return scriptLoadedSuccessfully;
}
