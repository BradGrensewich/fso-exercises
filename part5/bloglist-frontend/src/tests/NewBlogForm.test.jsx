import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// One-line mock to skip backend call
vi.mock('../services/blogs', () => ({
  default: {
    create: vi.fn().mockResolvedValue({
      title: 'A blog for tests',
      author: 'Brad Tester',
      url: 'test.com',
    }),
  },
}));

import NewBlogForm from '../components/NewBlogForm';

describe('<NewBlogForm />', () => {
  let mockHandleCreateBlog;

  beforeEach(() => {
    mockHandleCreateBlog = vi.fn();

    render(
      <NewBlogForm
        onCreateBlog={mockHandleCreateBlog}
        displayError={vi.fn()}
      />,
    );
  });

  test('calls event handler with correct details when new blog is created', async () => {
    const newBlog = {
      title: 'A blog for tests',
      author: 'Brad Tester',
      url: 'test.com',
    };

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('title'), newBlog.title);
    await user.type(screen.getByLabelText('author'), newBlog.author);
    await user.type(screen.getByLabelText('url'), newBlog.url);

    await user.click(screen.getByText('create'));

    // Wait for async createBlog to finish
    await vi.waitFor(() => {
      expect(mockHandleCreateBlog).toHaveBeenCalledTimes(1);
    });

    // Verify correct blog data was passed to the handler
    expect(mockHandleCreateBlog.mock.calls[0][0]).toEqual({
      title: 'A blog for tests',
      author: 'Brad Tester',
      url: 'test.com',
    });
  });
});
