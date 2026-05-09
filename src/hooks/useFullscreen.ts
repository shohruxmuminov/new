import { useEffect, useCallback } from 'react';

export function useFullscreen(elementRef?: React.RefObject<HTMLElement | null>) {
  const enter = useCallback(() => {
    const el = elementRef?.current ?? document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  }, [elementRef]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  return { enter, exit };
}
