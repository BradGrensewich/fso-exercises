import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

import { useAppDispatch } from '../../hooks';
import { createPatient } from '../../reducers/patientReducer';
import { PatientFormValues } from '../../types';
import AddPatientModal from '../AddPatientModal';
import PatientTable from './PatientTable';

const PatientListPage = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      dispatch(createPatient(values));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            '',
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className='App'>
      <Box>
        <Typography align='center' variant='h6'>
          Patient list
        </Typography>
      </Box>
      <PatientTable />
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
