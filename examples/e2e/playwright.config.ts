import { defineConfig, devices } from '@playwright/test';

const appUrl = 'http://127.0.0.1:5173';
const apiUrl = 'http://127.0.0.1:3030';

export default defineConfig({
  // Startpunkt in e2e/, Lösung in solution/: npm test führt beide aus.
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts', 'solution/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Lokal keine Wiederholung, damit ein flaky Test auffällt.
  // In CI läuft ein roter Test noch einmal; besteht er dann, meldet Playwright ihn als „flaky“.
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    // Tests nennen nur Pfade: page.goto('/')
    baseURL: appUrl,
    // Aufzeichnung nur bei Fehlern: npx playwright show-trace test-results/<test>/trace.zip
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright startet API und App, wartet, bis beide Adressen antworten, und beendet sie danach.
  webServer: [
    {
      command: 'npm run api',
      url: `${apiUrl}/api/health`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      url: appUrl,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
