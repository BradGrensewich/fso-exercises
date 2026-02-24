import { TextField } from '@mui/material';

interface HospitalFormFieldsProps {
  dischargeDate: string;
  setDischargeDate: (value: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (value: string) => void;
}

const HospitalFormFields = ({
  dischargeDate,
  dischargeCriteria,
  setDischargeDate,
  setDischargeCriteria,
}: HospitalFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default HospitalFormFields;
