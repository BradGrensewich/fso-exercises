import { useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { useAppDispatch } from './hooks';
import { initializeDiagnoses } from './reducers/diagnosisReducer';
import { initialPatients } from './reducers/patientReducer';
import PatientListPage from './components/PatientListPage';
import PatientInfo from './components/PatientInfo';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initialPatients());
    dispatch(initializeDiagnoses());
  }, [dispatch]);

  return (
    <div className='App'>
      <Container>
        <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to='/' variant='contained' color='primary'>
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path='/' element={<PatientListPage />} />
          <Route path='/patients/:id' element={<PatientInfo />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
