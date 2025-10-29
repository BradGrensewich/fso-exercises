const config = require('./config');
const logger = require('./logger');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Successfully connected server to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
  }
};
module.exports = connectDB;
