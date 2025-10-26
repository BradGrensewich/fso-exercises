const supertest = require('supertest');
const mongoose = require('mongoose');
const testHelper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.testBlogs);
});
describe('GET requests on /api/blogs', () => {
  test('return all blogs as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, testHelper.testBlogs.length);
    assert(
      response.body.map((b) => b.title).includes(testHelper.testBlogs[0].title),
    );
  });
  test('return blogs with proper id format and no versioning', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blog = response.body[0];
    assert(blog.id);
    assert(!blog._id);
    assert(!blog.__v);
  });
});

describe('POST requests on /api/blogs', () => {
  test('adds blog to database', async () => {
    await api
      .post('/api/blogs')
      .send(testHelper.singleValidBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const db = await testHelper.blogsInDb();
    assert.strictEqual(db.length, testHelper.testBlogs.length + 1);
    assert(db.map((b) => b.title).includes(testHelper.singleValidBlog.title));
  });

  test('saves a blog with zero likes if likes property is not provided', async () => {
    const { likes, ...blogWithNoLikesProperty } = testHelper.singleValidBlog;
    console.log(blogWithNoLikesProperty);
    const returnedBlog = await api
      .post('/api/blogs')
      .send(blogWithNoLikesProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const db = await testHelper.blogsInDb();
    const savedBlogInDb = db.find((b) => b.id == returnedBlog.body.id);
    assert.strictEqual(savedBlogInDb.likes, 0);
  });
});

after(async () => {
  mongoose.connection.close();
});
