import { expect } from '@playwright/test';
import { test } from '../fixtures/MyFixture';
import { TestData } from '../TestData';

test.describe(
  'login using storage state',
  {
    tag: ['@LoginPage', '@PositiveTests'],
    storageState: './storageState.json',
  },
  () => {
    test('LO-001 - user successfully logs in with valid credentials', async ({}) => {});
  }
);
