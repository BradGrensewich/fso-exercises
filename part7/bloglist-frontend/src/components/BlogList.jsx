import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeBlogs } from '../reducers/blogReducer';

import Blog from './Blog';

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  return (
    <ul>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </ul>
  );
};

export default BlogList;
