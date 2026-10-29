import { expect, it } from 'vitest';
import { parseEnv } from './env';

it('akzeptiert eine gültige Config', () => {
  expect(
    parseEnv({ VITE_API_URL: 'https://api.example.com', VITE_RELEASE: '1.2.0' })
  ).toEqual({ VITE_API_URL: 'https://api.example.com', VITE_RELEASE: '1.2.0' });
});

it('lehnt eine ungültige API-URL ab', () => {
  expect(() =>
    parseEnv({ VITE_API_URL: 'not-a-url', VITE_RELEASE: '1.2.0' })
  ).toThrow();
});
