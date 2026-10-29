export type Env = { VITE_API_URL: string; VITE_RELEASE: string };

const readString = (source: Record<string, unknown>, key: keyof Env) => {
  const value = source[key];
  if (typeof value !== 'string' || value === '')
    throw new Error(`Config: ${key} fehlt`);
  return value;
};

export const parseEnv = (source: Record<string, unknown>): Env => {
  const apiUrl = readString(source, 'VITE_API_URL');
  if (!URL.canParse(apiUrl))
    throw new Error(`Config: VITE_API_URL ist keine URL: ${apiUrl}`);
  return {
    VITE_API_URL: apiUrl,
    VITE_RELEASE: readString(source, 'VITE_RELEASE'),
  };
};

// Fails at startup – not later in front of a user.
export const env = parseEnv(import.meta.env);
