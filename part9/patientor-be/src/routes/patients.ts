import express, { Request } from 'express';
import patientServices from '../services/patients';
import { Response } from 'express';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import parser from '../../middleware/parser';
import errorHandler from '../../middleware/errorHandler';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientServices.getNonSensitivePatients());
});

router.post(
  '/',
  parser.newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient | string>,
  ) => {
    try {
      const addedPatient = patientServices.addPatient(req.body);
      res.status(201).json(addedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong :(';
      if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  },
);

router.use(errorHandler);

export default router;
