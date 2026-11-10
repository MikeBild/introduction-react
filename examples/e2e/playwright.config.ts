import { defineConfig, devices } from '@playwright/test';

const appUrl = 'http://127.0.0.1:5173';
const apiUrl = 'http://127.0.0.1:3030';

export default defineConfig({
  // Starting point in e2e/, reference solution in solution/: npm test runs both.
  testDir: '.',
  testMatch: ['e2e/**/*.spec.ts', 'solution/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // No retries locally, so that a flaky test stands out.
  // In CI a red test runs once more; if it passes then, Playwright reports it as “flaky”.
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    // Tests only name paths: page.goto('/')
    baseURL: appUrl,
    // Recording only on failures: npx playwright show-trace test-results/<test>/trace.zip
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Playwright starts API and app, waits until both addresses respond, and shuts them down afterwards.
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
