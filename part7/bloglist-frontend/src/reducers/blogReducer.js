import { createSlice } from '@reduxjs/toolkit';
import { displayError, displayNotification } from './notificationReducer';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const blog = action.payload;
      return state.map((b) => (b.id === blog.id ? blog : b));
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id != action.payload);
    },
  },
});
const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch {
      dispatch(displayError('error fetching initial blogs'));
    }
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(displayNotification('Blog added to DB'));
    } catch {
      dispatch(displayError('failed to add blog'));
    }
  };
};

export const addLikeToBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(displayNotification(`liked "${blog.title}" by ${blog.author}`));
    } catch {
      dispatch(displayError('error adding like to blog'));
    }
  };
};

export const addCommentToBlog = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      comments: blog.comments.concat(comment),
    });
    dispatch(updateBlog(updatedBlog));
    dispatch(
      displayNotification(`comment added to "${blog.title}" by ${blog.author}`),
    );
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog);
      dispatch(removeBlog(blog.id));
      dispatch(
        displayNotification(
          `successfully deleted "${blog.title}" by ${blog.author}`,
        ),
      );
    } catch {
      dispatch(displayError('error deleting blog'));
    }
  };
};
export default blogSlice.reducer;
