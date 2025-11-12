const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = request.user ? await User.findById(request.user.id) : null;
  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' });
  }
  const blog = new Blog({ ...request.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog);
  await user.save();
  console.log(savedBlog)
  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user ? await User.findById(request.user.id) : null;
  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' });
  }
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(204).end();
  }
  if (user.id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: 'user credentials not valid for delete of this blog' });
  }
  await Blog.findByIdAndDelete(blog.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  const { title, author, url, likes, } = request.body;

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;
  const updatedBlog = await blog.save();
  return response.json(updatedBlog);
});

module.exports = blogsRouter;
