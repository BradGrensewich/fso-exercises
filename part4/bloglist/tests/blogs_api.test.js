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
});

after(async () => {
  mongoose.connection.close();
});
