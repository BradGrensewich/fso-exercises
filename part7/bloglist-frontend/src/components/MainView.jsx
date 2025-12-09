import { useRef } from 'react';

import BlogList from './BlogList';
import NewBlogForm from './NewBlogForm';
import Toggleable from './Toggleable';

const MainView = ({ user }) => {
  const handleCreatedBlog = () => {
    newBlogFormRef.current.toggleVisibility();
  };

  const newBlogFormRef = useRef();
  return (
    <div>
      <h2>blogs</h2>
      <Toggleable
        buttonLabel='create new blog'
        closeLabel='stop creating blog'
        ref={newBlogFormRef}>
        <NewBlogForm onCreatedBlog={handleCreatedBlog} />
      </Toggleable>

      <BlogList user={user} />
    </div>
  );
};

export default MainView;
