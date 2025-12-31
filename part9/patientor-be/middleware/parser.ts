import { Request, Response, NextFunction } from 'express';
import { NewPatientSchema } from '../utils';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default { newPatientParser };
