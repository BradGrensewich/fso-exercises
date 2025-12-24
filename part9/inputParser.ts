import express from 'express';

const getCmdArgsBmi = (args: string[]) => {
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

const getQueryParamsBmi = (args: express.Request['query']) => {
  if (!args.height || !args.weight)
    throw new Error('Need to provide height and weight');
  if (!isNaN(Number(args.height)) && !isNaN(Number(args.weight))) {
    return {
      height: Number(args.height),
      weight: Number(args.weight),
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

const parser = { getCmdArgsBmi, getQueryParamsBmi, exerciseCalculator };

export default parser;
