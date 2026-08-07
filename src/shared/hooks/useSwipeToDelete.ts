import { useRef, useState } from 'react';

export interface UseSwipeToDeleteOptionsModel {
  threshold?: number;
  maxSwipeDistance?: number;
  longPressDuration?: number;
  onSwipeDelete: () => void;
  onLongPress?: () => void;
}

export function useSwipeToDelete({
  threshold = 100,
  maxSwipeDistance = 160,
  longPressDuration = 500,
  onSwipeDelete,
  onLongPress,
}: UseSwipeToDeleteOptionsModel) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActiveRef = useRef(false);
  const isHorizontalSwipeRef = useRef(false);

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleStart = (clientX: number, clientY: number) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    isLongPressActiveRef.current = false;
    isHorizontalSwipeRef.current = false;

    clearLongPressTimer();
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        isLongPressActiveRef.current = true;
        if (typeof window !== 'undefined' && window.navigator?.vibrate) {
          window.navigator.vibrate(40);
        }
        setOffsetX(0);
        setIsDragging(false);
        onLongPress();
      }, longPressDuration);
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;

    // Cancel long press if moved more than 8px
    if (Math.hypot(deltaX, deltaY) > 8) {
      clearLongPressTimer();
    }

    // Determine direction on first significant movement
    if (!isHorizontalSwipeRef.current && Math.hypot(deltaX, deltaY) > 10) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalSwipeRef.current = true;
      }
    }

    if (
      isHorizontalSwipeRef.current &&
      deltaX < 0 &&
      !isLongPressActiveRef.current
    ) {
      // Swiping left
      setIsDragging(true);
      setOffsetX(Math.max(deltaX, -maxSwipeDistance));
    }
  };

  const handleEnd = () => {
    clearLongPressTimer();

    if (isLongPressActiveRef.current) {
      setOffsetX(0);
      setIsDragging(false);
      return;
    }

    if (offsetX <= -threshold) {
      onSwipeDelete();
    }

    setOffsetX(0);
    setIsDragging(false);
    isHorizontalSwipeRef.current = false;
  };

  const touchProps = {
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    onTouchMove: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    onTouchEnd: handleEnd,
    onTouchCancel: handleEnd,
    onMouseDown: (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      handleStart(e.clientX, e.clientY);
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!isDragging && !longPressTimerRef.current) return;
      handleMove(e.clientX, e.clientY);
    },
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onContextMenu: (e: React.MouseEvent) => {
      if (isLongPressActiveRef.current) {
        e.preventDefault();
      }
    },
  };

  const swipeProgress = Math.min(Math.abs(offsetX) / threshold, 1);

  return {
    offsetX,
    isDragging,
    swipeProgress,
    touchProps,
    resetSwipe: () => setOffsetX(0),
  };
}
