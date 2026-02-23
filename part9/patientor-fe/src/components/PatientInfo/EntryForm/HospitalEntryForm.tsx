import { useState, SyntheticEvent } from 'react';
import { TextField, Button, DialogContent, Alert } from '@mui/material';
import { useAppDispatch } from '../../../hooks';
import { createNewEntry } from '../../../reducers/patientReducer';

interface HospitalEntryFormProps {
  patientId: string;
  setVariant: (value: string) => void;
}

const HospitalEntryForm = ({
  patientId,
  setVariant,
}: HospitalEntryFormProps) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [error, setError] = useState<string>('');

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes = diagnoses.split(' ');
    const discharge = {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };

    try {
      await dispatch(
        createNewEntry(
          {
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge,
            type: 'Hospital',
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
        label='Diagnosis Codes'
        fullWidth
        value={diagnoses}
        onChange={({ target }) => setDiagnoses(target.value)}
      />
      <TextField
        label='Discharge Date'
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label='Discharge Criteria'
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalEntryForm;
