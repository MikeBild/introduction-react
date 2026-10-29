// Path Params sind immer Strings. Diese Funktion macht daraus eine gültige ID oder null.
export const parseResourceId = (value: string | undefined): number | null => {
  if (!value || !/^\d+$/.test(value)) return null;
  return Number(value);
};
