const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

describe('when there are already users in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(testHelper.testUsers);
  });
  describe('GET requests', () => {
    test('return all users as JSON without revealing passwords', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const users = response.body;
      assert.strictEqual(users.length, testHelper.testUsers.length);
      users.forEach((user) => {
        assert(!user.passwordHash);
        assert(!user.password);
      });
    });
  });
  describe('POST requests', () => {
    test('succeed adding valid user to DB', async () => {
      await api
        .post('/api/users')
        .send(testHelper.singleValidUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersInDb = await testHelper.usersInDb();
      assert.strictEqual(usersInDb.length, testHelper.testUsers.length + 1);
      assert(
        usersInDb
          .map((u) => u.username)
          .includes(testHelper.singleValidUser.username),
      );
    });
    test('responds with 400 and does not save when username property not provided', async () => {
      const { username, ...userWithNoUsername } = testHelper.singleValidUser;
      await api.post('/api/users').send(userWithNoUsername).expect(400);
      const db = await testHelper.usersInDb();
      assert.strictEqual(db.length, testHelper.testUsers.length);
    });
    test('responds with 400 and does not save when name property not provided', async () => {
      const { name, ...userWithNoName } = testHelper.singleValidUser;
      await api.post('/api/users').send(userWithNoName).expect(400);
      const db = await testHelper.usersInDb();
      assert.strictEqual(db.length, testHelper.testUsers.length);
    });
    test('responds with 400 and does not save when password property not provided', async () => {
      const { password, ...userWithNoPassword } = testHelper.singleValidUser;
      await api.post('/api/users').send(userWithNoPassword).expect(400);
      const db = await testHelper.usersInDb();
      assert.strictEqual(db.length, testHelper.testUsers.length);
    });
     test('responds with 400 and does not save when password property is below minimum allowed length', async () => {
      const userWithShortPassword = {...testHelper.singleValidUser, password: 'ab'};
      const response = await api.post('/api/users').send(userWithShortPassword).expect(400);

       assert.strictEqual(
        response.body.error,
        'password must be at least 3 characters',
      );
      const db = await testHelper.usersInDb();
      assert.strictEqual(db.length, testHelper.testUsers.length);
    });
    test('responds with 400 and does not save when username property not unique', async () => {
      const user = { ...testHelper.testUsers[0], password: 'test password' };
      const response = await api.post('/api/users').send(user).expect(400);

      assert.strictEqual(
        response.body.error,
        'expected `username` to be unique',
      );
      const db = await testHelper.usersInDb();
      assert.strictEqual(db.length, testHelper.testUsers.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
