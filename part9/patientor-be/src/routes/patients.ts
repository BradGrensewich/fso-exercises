import express from 'express';
import patientServices from '../services/patients';
import { Response } from 'express';
import { nonSensitivePatient } from '../types';
import { toNewPatient } from '../../utils';

const router = express.Router();

router.get('/', (_req, res: Response<nonSensitivePatient[]>) => {
  res.send(patientServices.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
