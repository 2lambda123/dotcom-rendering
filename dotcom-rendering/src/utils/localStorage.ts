// dotcom-rendering/src/utils/localStorage.ts

export const setItem = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  window.localStorage.removeItem(key);
};
