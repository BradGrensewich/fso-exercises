const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  
  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.SECRET,
    { expiresIn: 60 * 60 },
  );

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
