"use client";
import { useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState<string>(() => {
    try {
      if (window) {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue; // Fallback in case of error
    }
  });

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      if (window) {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setState(valueToStore); // Update state with the stored value
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue] as const;
};

export default useLocalStorage;
