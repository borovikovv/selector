import { RefObject, useEffect } from 'react';

export type EventListenerType = MouseEvent | TouchEvent | KeyboardEvent;

export const useClickOutside = <T extends RefObject<HTMLElement>>(
  ref: T,
  handler: (event: EventListenerType) => void,
  keydown?: boolean,
): void => {
  useEffect(
    () => {
      const listener = (event: EventListenerType) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      if (keydown) {
        document.addEventListener('keydown', listener);
      }
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
        if (keydown) {
          document.removeEventListener('keydown', listener);
        }
      };
    },
    [ref, handler],
  );
};
