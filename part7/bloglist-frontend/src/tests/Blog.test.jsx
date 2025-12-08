import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import { beforeEach, expect, test, vi } from 'vitest';

describe('<Blog />', () => {
  let onAddLikeMockHandler;
  beforeEach(() => {
    const user = { id: 123, username: 'a user', name: 'fake' };
    const blog = {
      url: 'test.com',
      author: 'Brad Tester',
      title: 'A blog for tests',
      likes: 3,
      id: 2,
      user: user,
    };
    onAddLikeMockHandler = vi.fn();

    render(
      <Blog
        key={blog.id}
        blog={blog}
        onAddLike={onAddLikeMockHandler}
        // onDeleteBlog={onDeleteBlog}
        user={user}
      />,
    );
  });
  test('renders title and author', () => {
    const authorEl = screen.getByText('Brad Tester');
    const titleEl = screen.getByText('A blog for tests');
    expect(authorEl).toBeVisible();
    expect(titleEl).toBeVisible();
  });
  test('initially does not display URL and likes', () => {
    const likesEl = screen.getByText('likes: 3');
    const urlEl = screen.getByText('test.com');
    expect(likesEl).not.toBeVisible();
    expect(urlEl).not.toBeVisible();
  });
  test('displays URL and likes after clicking "view" button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const likesEl = screen.getByText('likes: 3');
    const urlEl = screen.getByText('test.com');
    expect(likesEl).toBeVisible();
    expect(urlEl).toBeVisible();
  });
  test('if like button is clicked twice, event handler is called twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likesButton = screen.getByText('like');
    await user.click(likesButton);
    await user.click(likesButton);
    expect(onAddLikeMockHandler).toHaveBeenCalled(2);
  });
});
