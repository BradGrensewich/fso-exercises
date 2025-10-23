const express = require('express');
const connectDB = require('./utils/db');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

connectDB();
const app = express();
app.use(express.json());
app.use(middleware.requestLogger);

//routes
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
