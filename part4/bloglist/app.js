const express = require('express');
const connectDb = require('./utils/db')
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

connectDb()
const app = express();

app.use(express.json());
app.use(middleware.requestLogger);

//routes
app.use( '/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
