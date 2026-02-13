import express, { Request } from 'express';
import patientServices from '../services/patients';
import { Response } from 'express';
import { NewPatient, NonSensitivePatient, Patient, NewEntry } from '../types';
import parser from '../../middleware/parser';
import errorHandler from '../../middleware/errorHandler';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientServices.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientServices
    .getNonSensitivePatients()
    .find((p) => p.id === id);
  if (!patient) {
    res.status(404).send('patient not found');
  }
  res.send(patient);
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

router.post<{ id: string }, unknown, NewEntry>(
  '/:id/entries',
  parser.newEntryParser,
  (req, res) => {
    //get patient
    const id = req.params.id;
    const patient = patientServices.getPatients().find((p) => p.id === id);
    if (!patient) {
      return res.status(404).send('patient not found');
    }
    try {
      const updatedPatient = patientServices.addEntryToPatient(
        patient,
        req.body,
      );
      return res.status(201).json(updatedPatient);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong :(';
      if (error instanceof Error) {
        errorMessage = 'Error: ' + error.message;
      }
      return res.status(400).send(errorMessage);
    }
  },
);

router.use(errorHandler);

export default router;
