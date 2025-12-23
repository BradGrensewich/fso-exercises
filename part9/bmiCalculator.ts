import parser from './argumentParser';

const calculateBmi = (height: number, weight: number): string => {
  const isBetween = (low: number, num: number, high: number) => {
    return num > low && num <= high;
  };
  const heightInMeters = height * 0.01;
  const bmi = weight / (heightInMeters * heightInMeters);
  switch (true) {
    case isBetween(0, bmi, 18.5):
      return 'Underweight';
    case isBetween(18.5, bmi, 25):
      return 'Normal range';
    case isBetween(25, bmi, 30):
      return 'Overweight';
    case isBetween(30, bmi, 100):
      return 'Obese';
    default:
      return 'Bad input';
  }
};
try {
  const { height, weight } = parser.bmiCalculator(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
