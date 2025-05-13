export const getParsedStorageObject = (key: string): Record<string, unknown> => {
  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getParsedBoolean = (key: string): boolean => {
  const raw = localStorage.getItem(key);
  try {
    return raw ? JSON.parse(raw) === true : false;
  } catch {
    return false;
  }
};

export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

export const userHasAccountFrom = (
  local: Record<string, unknown>,
  context: Record<string, unknown>
): boolean => {
  return !isEmptyObject(local) || !isEmptyObject(context);
};