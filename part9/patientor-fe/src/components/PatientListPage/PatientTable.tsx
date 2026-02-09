import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import PatientListItem from './PatientListItem';
import { Patient } from '../../types';

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable = ({ patients } : PatientTableProps) => {
  return (
    <Table style={{ marginBottom: '1em' }}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Occupation</TableCell>
          <TableCell>Health Rating</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(patients).map((patient: Patient) => (
          <PatientListItem key={patient.id} patient={patient} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientTable;
