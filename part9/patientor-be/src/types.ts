import z from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

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
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
});

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
  NewHealthCheckEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;

export type Entry = NewEntry & {
  id: string;
};

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
