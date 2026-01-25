import { test } from '../fixtures/MyFixture';

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
