import { TableRow, TableCell } from '@mui/material';
import HealthRatingBar from '../HealthRatingBar';

import { Patient } from '../../types';
import { Link } from 'react-router-dom';

interface PatientListItemProps {
  patient: Patient;
}

const PatientListItem = ({ patient }: PatientListItemProps) => {
  return (
    <TableRow key={patient.id}>
      <TableCell>
        <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
      </TableCell>
      <TableCell>{patient.gender}</TableCell>
      <TableCell>{patient.occupation}</TableCell>
      <TableCell>
        <HealthRatingBar showText={false} rating={1} />
      </TableCell>
    </TableRow>
  );
};

export default PatientListItem;
