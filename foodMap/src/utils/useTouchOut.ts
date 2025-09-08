import React, { useEffect } from 'react';

function useTouchOut<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  hanlder: (event: Event | TouchEvent | MouseEvent) => void,
) {
  useEffect(() => {
    function onPointerHandler(event: TouchEvent | MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      hanlder(event);
    }

    window.addEventListener('pointerdown', onPointerHandler);

    return () => {
      window.removeEventListener('pointerdown', onPointerHandler);
    };
  }, [ref, hanlder]);
}
export default useTouchOut;
