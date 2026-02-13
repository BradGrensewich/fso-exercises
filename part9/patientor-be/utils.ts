import { z } from 'zod';
import { NewPatient, HealthCheckRating, NewPatientSchema } from './src/types';


export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const NewBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: 'OccupationalHealthcare',
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: 'Hospital',
  discharge: DischargeSchema,
});

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: 'HealthCheck',
  healthCheckRating: z.enum(HealthCheckRating),
});

export const NewEntrySchema = z.union([
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
  NewHealthCheckEntrySchema,
]);