import { TextField } from '@mui/material';

interface OccupationalHealthcareFormFieldsProps {
  employerName: string;
  sickLeaveStart: string;
  sickLeaveEnd: string;
  setEmployerName: (value: string) => void;
  setSickLeaveStart: (value: string) => void;
  setSickLeaveEnd: (value: string) => void;
}

const OccupationalHealthcareFormFields = ({
  employerName,
  sickLeaveStart,
  sickLeaveEnd,
  setEmployerName,
  setSickLeaveStart,
  setSickLeaveEnd,
}: OccupationalHealthcareFormFieldsProps) => {
  return (
    <>
      <TextField
        label='Employer Name'
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        label='Sick Leave Start Date'
        fullWidth
        value={sickLeaveStart}
        onChange={({ target }) => setSickLeaveStart(target.value)}
      />
      <TextField
        label='Sick Leave End Date'
        fullWidth
        value={sickLeaveEnd}
        onChange={({ target }) => setSickLeaveEnd(target.value)}
      />
    </>
  );
};

export default OccupationalHealthcareFormFields;
