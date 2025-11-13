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
      await expect(
        page.getByText('bradGrensewich is logged in'),
      ).not.toBeVisible();
    });
  });
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'bradGrensewich', 'secretword');
    });

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(page, 'testblog', 'testblogger', 'testurl');
      await expect(page.getByText('testblogger')).toBeVisible();
    });
  });
  describe('When a user is logged in and creates a blog', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'bradGrensewich', 'secretword');
      await helper.createBlog(page, 'testblog', 'testblogger', 'testurl');
    });
    test('they can add a like to the blog', async ({ page }) => {
      await helper.openBlogInfo(page, 'testblog');
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('likes: 1')).toBeVisible();
    });
    test('they can delete that blog', async ({ page }) => {
      //dialogue handler
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept(); // Clicks "OK"
      });

      await helper.openBlogInfo(page, 'testblog');
      await page.getByRole('button', { name: 'remove' }).click();
      await expect(
        page.getByText('successfully deleted "testblog"'),
      ).toBeVisible();
    });
  });

  describe('when there are multiple blogs', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'bradGrensewich', 'secretword');

      await helper.createBlog(page, 'blog1', 'testblogger', 'testurl');
      await helper.createBlog(page, 'blog2', 'testblogger', 'testurl');
      await helper.createBlog(page, 'blog3', 'testblogger', 'testurl');
    });
    test.only('they are sorted by likes correctly', async ({ page }) => {
      await helper.openBlogInfo(page, 'blog1');
      await helper.openBlogInfo(page, 'blog2');
      await helper.openBlogInfo(page, 'blog3');

      await helper.addLike(page, 'blog2', 1);
      await helper.addLike(page, 'blog2', 2);
      await helper.addLike(page, 'blog3', 1);

      await expect(page.locator('li').first().getByText('blog2')).toBeVisible();
    });
  });
});
