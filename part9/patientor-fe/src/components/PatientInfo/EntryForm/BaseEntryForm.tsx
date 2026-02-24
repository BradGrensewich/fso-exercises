import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Button,
  DialogContent,
  Alert,
  Input,
} from '@mui/material';
import { useAppDispatch } from '../../../hooks';
import { createNewEntry } from '../../../reducers/patientReducer';
import {
  HealthCheckEntryFormValues,
  HealthCheckRating,
  HospitalEntryFormValues,
  OccupationalHealthcareEntryFormValues,
} from '../../../types';
import HealthCheckFormFields from './HealthCheckFormFields';
import HospitalFormFields from './HospitalFormFields';
import OccupationalHealthcareFormFields from './OccupationalHealthcareFormFields';
import DiagnosesField from './DiagnosesField';


type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' | '';

interface BaseEntryFormProps {
  patientId: string;
  variant: EntryType;
  setVariant: (value: EntryType) => void;
}

const BaseEntryForm = ({
  patientId,
  variant,
  setVariant,
}: BaseEntryFormProps) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy,
  );
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [error, setError] = useState<string>('');

  const extraFields = () => {
    switch (variant) {
      case 'HealthCheck':
        return (
          <HealthCheckFormFields
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        );
      case 'Hospital':
        return (
          <HospitalFormFields
            dischargeDate={dischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeDate={setDischargeDate}
            setDischargeCriteria={setDischargeCriteria}
          />
        );
      //case: 'OccupationalHealthcare'
      default:
        return (
          <OccupationalHealthcareFormFields
            employerName={employerName}
            sickLeaveStart={sickLeaveStart}
            sickLeaveEnd={sickLeaveEnd}
            setEmployerName={setEmployerName}
            setSickLeaveStart={setSickLeaveStart}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        );
    }
  };

  const createEntryObject = ():
    | HealthCheckEntryFormValues
    | OccupationalHealthcareEntryFormValues
    | HospitalEntryFormValues
    | null => {
    const baseObject = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnoses,
    };
    switch (variant) {
      case 'HealthCheck':
        return {
          ...baseObject,
          type: variant,
          healthCheckRating,
        };
      case 'Hospital':
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        return {
          ...baseObject,
          type: variant,
          discharge,
        };
      case 'OccupationalHealthcare':
        const sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
        return {
          ...baseObject,
          type: variant,
          employerName,
          sickLeave,
        };
      default:
        return null;
    }
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entryObject = createEntryObject();
    if (!entryObject) return;
    try {
      await dispatch(createNewEntry(entryObject, patientId));
      setVariant('');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={addEntry}>
      <DialogContent>
        {error && <Alert severity='error'>{error}</Alert>}
      </DialogContent>
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <label>Date:</label>
      <Input
        fullWidth
        id='date'
        type='date'
        value={date}
        onChange={({ target }) => setDate(target.value)}></Input>
      <TextField
        label='Specialist'
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
     <DiagnosesField diagnoses={diagnoses} setDiagnoses={setDiagnoses}/>
      {extraFields()}

      <Button
        style={{
          float: 'right',
        }}
        type='submit'
        variant='contained'>
        Add
      </Button>
      <Button
        onClick={() => setVariant('')}
        style={{
          float: 'right',
        }}
        type='button'
        variant='contained'>
        cancel
      </Button>
    </form>
  );
};

export default BaseEntryForm;
