import { defineConfig, devices } from '@playwright/test';
import { AllureReporter } from 'allure-playwright';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'], // Optional: console reporter
    ['allure-playwright', { outputFolder: 'allure-results' }], // Allure reporter configuration as string
  ],
  use: {
    trace: 'on-first-retry',
    // baseURL: 'http://127.0.0.1:3000', // Uncomment if you have a base URL
  },
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
