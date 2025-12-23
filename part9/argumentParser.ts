const bmiCalculator = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const exerciseCalculator = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let array: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      console.log(args[i]);
      array = array.concat(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  if (!isNaN(Number(args[2]))) {
    return {
      dailyTargetHours: Number(args[2]),
      hours: array,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const parser = { bmiCalculator, exerciseCalculator };

export default parser;
