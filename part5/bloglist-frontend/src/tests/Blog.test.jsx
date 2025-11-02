import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import { beforeEach, expect, test } from 'vitest';

describe('<Blog />', () => {
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

    render(
      <Blog
        key={blog.id}
        blog={blog}
        // onAddLike={onAddLike}
        // onDeleteBlog={onDeleteBlog}
        user={user}
      />,
    );
  });
  test('renders title and author', () => {
    const authorEl = screen.getByText('Brad Tester');
    const titleEl = screen.getByText('A blog for tests');
    expect(authorEl).toBeVisible()
    expect(titleEl).toBeVisible()
  });
  test('initially does not render URL and likes', () => {
    const likesEl = screen.getByText('likes: 3')
    const urlEl = screen.getByText('test.com')
    expect(likesEl).not.toBeVisible()
    expect(urlEl).not.toBeVisible()
  })
});
