import { useState, SyntheticEvent } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  DialogContent,
  Alert,
} from '@mui/material';
import { useAppDispatch } from '../../../hooks';
import { createNewEntry } from '../../../reducers/patientReducer';
import { HealthCheckRating } from '../../../types';

interface HealthCheckEntryFormProps {
  patientId: string;
  setVariant: (value: string) => void;
}

const HealthCheckEntryForm = ({
  patientId,
  setVariant,
}: HealthCheckEntryFormProps) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy,
  );
  const [diagnoses, setDiagnoses] = useState('');
  const [error, setError] = useState<string>('');

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('adding entry from form');
    const diagnosisCodes = diagnoses.split(' ');
    try {
      await dispatch(
        createNewEntry(
          {
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes,
            type: 'HealthCheck',
          },
          patientId,
        ),
      );
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
      <h4>New HealthCheck Entry</h4>
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label='Date'
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />

      <TextField
        label='Specialist'
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label='Health Check Rating'
        select
        fullWidth
        margin='normal'
        value={healthCheckRating}
        onChange={({ target }) =>
          setHealthCheckRating(Number(target.value) as HealthCheckRating)
        }>
        <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>1 - Low Risk</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>2 - High Risk</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>
          3 - Critical Risk
        </MenuItem>
      </TextField>

      <TextField
        label='Diagnosis Codes'
        fullWidth
        value={diagnoses}
        onChange={({ target }) => setDiagnoses(target.value)}
      />
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

export default HealthCheckEntryForm;
