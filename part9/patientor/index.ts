import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(3001, () => {
  console.log(`server running on ${PORT}`);
});
