import parser from './argumentParser';

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (
  success: boolean,
  average: number,
  target: number,
): number => {
  return !success ? 1 : average > target * 1.25 ? 3 : 2;
};

const getRatingDescription = (rating: number): string => {
  return rating === 1 ? 'terrible' : rating === 2 ? 'good' : 'awesome';
};

const calculateExercises = (
  hours: number[],
  dailyTargetHours: number,
): Results => {
  const results = {
    periodLength: hours.length,
    trainingDays: hours.reduce((acc, curr) => (curr != 0 ? acc + 1 : acc), 0),
    average: hours.reduce((acc, curr) => curr + acc, 0) / hours.length,
    target: dailyTargetHours,
    success: false,
    rating: 1,
    ratingDescription: 'terrible',
  };
  results.success = results.average >= results.target;
  results.rating = getRating(results.success, results.average, results.target);
  results.ratingDescription = getRatingDescription(results.rating);

  return results;
};
try {
  const { hours, dailyTargetHours } = parser.exerciseCalculator(process.argv);
  console.log(calculateExercises(hours, dailyTargetHours));
} catch (error: unknown) {
  let errorMessage = 'something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
