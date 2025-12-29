import express from 'express';
import patientServices from '../services/patients';
import { Response } from 'express';
import { nonSensitivePatients } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<nonSensitivePatients[]>) => {
  res.send(patientServices.getNonSensitivePatients());
});

export default router;
