import { expect, it } from 'vitest';
import { parseEnv } from './env';

it('accepts a valid config', () => {
  expect(
    parseEnv({ VITE_API_URL: 'https://api.example.com', VITE_RELEASE: '1.2.0' })
  ).toEqual({ VITE_API_URL: 'https://api.example.com', VITE_RELEASE: '1.2.0' });
});

it('rejects an invalid API URL', () => {
  expect(() =>
    parseEnv({ VITE_API_URL: 'not-a-url', VITE_RELEASE: '1.2.0' })
  ).toThrow();
});
