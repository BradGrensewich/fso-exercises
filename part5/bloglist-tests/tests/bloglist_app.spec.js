const { test, expect, beforeEach, describe } = require('@playwright/test');
const helper = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    page.goto('/');
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: 'bradGrensewich',
        password: 'secretword',
        name: 'Brad',
      },
    });
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginWith(page, 'bradGrensewich', 'secretword');
      await expect(page.getByText('bradGrensewich is logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await helper.loginWith(page, 'bradGrensewich', 'wrongpassword');
      await expect(page.getByText('bradGrensewich is logged in')).not.toBeVisible()
    });
  });
});
