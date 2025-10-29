const supertest = require('supertest');
const mongoose = require('mongoose');
const testHelper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');

const api = supertest(app);
describe('when there are already blogs in the database', () => {
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
        response.body
          .map((b) => b.title)
          .includes(testHelper.testBlogs[0].title),
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
  describe('DELETE requests', () => {
    test('fail with status code 401 if user is not logged in', async () => {
      const blogs = await testHelper.blogsInDb();
      const originalLength = blogs.length;
      const blogToDeleteId = blogs[0].id;
      await api.delete(`/api/blogs/${blogToDeleteId}`).expect(401);

      const db = await testHelper.blogsInDb();
      assert.strictEqual(db.length, originalLength);
    });
    describe('if user and is logged in and has created a blog', () => {
      let token;
      let ownedBlogId;
      beforeEach(async () => {
        await User.deleteMany({});
        const user = testHelper.singleValidUser;
        await api.post('/api/users').send(user);

        const loginResponse = await api.post('/api/login').send(user);
        token = loginResponse.body.token;

        const blogResponse = await api
          .post('/api/blogs')
          .send(testHelper.singleValidBlog)
          .set({ Authorization: `Bearer ${token}` });
        ownedBlogId = blogResponse.body.id;
      });
      test('succeed with status code 204 and remove blog from DB', async () => {
        const blogs = await testHelper.blogsInDb();
        const originalLength = blogs.length;
        await api
          .delete(`/api/blogs/${ownedBlogId}`)
          .set({ Authorization: `Bearer ${token}` })
          .expect(204);

        const db = await testHelper.blogsInDb();
        assert(!db.find((b) => b.id === ownedBlogId));
        assert.strictEqual(db.length, originalLength - 1);
      });
      test('still responds with status code 204 on ID not in DB but make no DB changes', async () => {
        const blogs = await testHelper.blogsInDb();
        const originalLength = blogs.length;
        const fakeId = await testHelper.nonExistingId();
        await api
          .delete(`/api/blogs/${fakeId}`)
          .set({ Authorization: `Bearer ${token}` })
          .expect(204);

        const db = await testHelper.blogsInDb();
        assert.strictEqual(db.length, originalLength);
      });
    });
  });
});
describe('PUT requests', () => {
  test('succeed with correct status code when changing likes', async () => {
    const blogs = await testHelper.blogsInDb();
    const blogToUpdate = { ...blogs[0], likes: blogs[0].likes + 1 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const db = await testHelper.blogsInDb();
    const updatedBlog = db.find((b) => b.id === blogToUpdate.id);
    assert.deepStrictEqual(blogToUpdate, updatedBlog);
  });

  test('returns 404 when attempting update on blog not in DB', async () => {
    const nonExistingId = await testHelper.nonExistingId();
    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send({ author: 'test', url: 'test.com', title: 'test' })
      .expect(404);
  });
});

describe('POST requests on /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
  });
  describe('if a user exists and is logged in', () => {
    let token;
    beforeEach(async () => {
      const user = testHelper.singleValidUser;
      await api.post('/api/users').send(user);
      const response = await api.post('/api/login').send(user);
      token = response.body.token;
    });
    test('adds blog to database', async () => {
      await api
        .post('/api/blogs')
        .send(testHelper.singleValidBlog)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const db = await testHelper.blogsInDb();
      assert.strictEqual(db.length, 1);
      assert(db.map((b) => b.title).includes(testHelper.singleValidBlog.title));
    });

    test('saves a blog with zero likes if likes property is not provided', async () => {
      const { likes, ...blogWithNoLikesProperty } = testHelper.singleValidBlog;
      const returnedBlog = await api
        .post('/api/blogs')
        .send(blogWithNoLikesProperty)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const db = await testHelper.blogsInDb();
      const savedBlogInDb = db.find((b) => b.id == returnedBlog.body.id);
      assert.strictEqual(savedBlogInDb.likes, 0);
    });

    test('responds with 400 and does not save when title property not provided', async () => {
      const { title, ...blogWithNoTitleProperty } = testHelper.singleValidBlog;
      await api
        .post('/api/blogs')
        .send(blogWithNoTitleProperty)
        .set({ Authorization: `Bearer ${token}` })
        .expect(400);
      const db = await testHelper.blogsInDb();
      assert.strictEqual(db.length, 0);
    });
    test('responds with 400 and does not save when url property not provided', async () => {
      const { url, ...blogWithNoUrlProperty } = testHelper.singleValidBlog;
      await api
        .post('/api/blogs')
        .send(blogWithNoUrlProperty)
        .set({ Authorization: `Bearer ${token}` })
        .expect(400);
      const db = await testHelper.blogsInDb();
      assert.strictEqual(db.length, 0);
    });
  });
  test('fail with 401 status code if user is not logged in', async () => {
    await api.post('/api/blogs').send(testHelper.singleValidBlog).expect(401);

    const db = await testHelper.blogsInDb();
    assert.strictEqual(db.length, 0);
  });
});

after(async () => {
  mongoose.connection.close();
});
