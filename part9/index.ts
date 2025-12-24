import express from 'express';
const app = express();
import parser from './inputParser';
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('hello world');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parser.getQueryParamsBmi(req.query);
    const bmi = calculateBmi(height, weight);
    res.json({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
