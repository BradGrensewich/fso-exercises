const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await page.getByLabel('title').waitFor();
  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);
  await page.getByRole('button', { name: 'create' }).click();

  await page.locator('li', { hasText: title }).waitFor();
};

const openBlogInfo = async (page, title) => {
  const blog = page.locator('li', { hasText: title });
  await blog.getByRole('button', { name: 'view' }).click();
  await blog.getByRole('button', { name: 'hide' }).waitFor();
};

const addLike = async (page, title, expectedTotal) => {
  const blog = page.locator('li', { hasText: title });
  await blog.getByRole('button', { name: 'like' }).click();
  await blog.getByText(`likes: ${expectedTotal}`).waitFor();
};

export { loginWith, createBlog, openBlogInfo, addLike };
