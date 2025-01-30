// client/src/hooks/useDebounce.js

import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup function prevents unnecessary executions
    };
  }, [value, delay]);

  return debouncedValue; // Only return the debounced value (not the setter)
}
