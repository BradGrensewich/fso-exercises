import express from 'express';
const app = express();
import parser from './inputParser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json())

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
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    console.log(req.body)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    const exerciseInfo = calculateExercises(daily_exercises as number[], target as number);
    res.json(exerciseInfo);
  } catch {
    res.status(400).json({ error: 'bad request' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
