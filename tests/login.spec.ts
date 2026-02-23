import { test } from '../fixtures/MyFixture';

test.describe(
  'Login using storage state',
  {
    tag: ['@LoginPage', '@PositiveTests'],
  },
  () => {
    test.use({ storageState: './storageState.json' });
    test('LO-001 User successfully logs in with valid credentials', async ({}) => {});
  }
);
