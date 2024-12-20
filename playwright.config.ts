import { defineConfig, devices } from '@playwright/test';

const LANGUAGE = process.env.LANGUAGE || 'en';
const BROWSER = process.env.BROWSER || 'chromium'; 
const PLATFORM = process.env.PLATFORM || 'desktop'; 
const languageToPath: Record<string, string> = {
  en: '/en',
  et: '/et',
  fi: '/fi',
  es: '/es',
  is: '/is',
};

const langPath = languageToPath[LANGUAGE] || '/en';

const baseURL = `https://epicbet.com${langPath}`;

export default defineConfig({
  timeout: 45_000,
  testDir: './tests',
  outputDir: './results/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
      ['html', { outputFolder: './reports/html-report' }],
      ['allure-playwright', { resultsDir: 'results/allure-results' }]
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: "et",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "en",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
