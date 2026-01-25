import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// npm install -D dotenv

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  globalSetup: './globalSetup.ts',

  timeout: 120 * 1000,
  expect: {
    timeout: 10000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',actionTimeout: 10000, // Таймаут для дій (click, fill ...)
    navigationTimeout: 30000, // Таймаут для навігації
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'tests',
      testMatch: '**/tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASEURL || 'https://teststore.automationtesting.co.uk',
        /* Reuse authentication state from global setup */
        storageState: './storageState.json',
      },
    },
  ],

  outputDir: 'test-results/',
});
