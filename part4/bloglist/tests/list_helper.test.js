const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');
const { testBlogs, listWithOneBlog } = require('./testblogs');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has no blogs, returns zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0);
  });
  test('when list has many blog, returns correct likes', () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result , 36);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test('when list has no blogs, is undefined', () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, undefined);
  });

  test('when list has many blogs, returns correct blog', () => {
    const result = listHelper.favoriteBlog(testBlogs);
    assert.deepStrictEqual(result, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});

describe('most blogs', () => {
  test('when list has only one blog, returns its author and count of 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', blogs: 1});
  });

  test('when list has no blogs, is undefined', () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, undefined);
  });
  test('when list has many blogs, returns correct  author and count', () => {
    const result = listHelper.mostBlogs(testBlogs)
    assert.deepStrictEqual(result , {author: "Robert C. Martin", blogs: 3});
  });
});

describe('most likes', () => {
  test('when list has only one blog, returns its author and count of 1', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 5});
  });

  test('when list has no blogs, is undefined', () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, undefined);
  });
  test('when list has many blogs, returns correct  author and count', () => {
    const result = listHelper.mostLikes(testBlogs)
    assert.deepStrictEqual(result , {author: "Edsger W. Dijkstra", likes: 17});
  });
});