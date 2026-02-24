import { useAppSelector } from '../../../hooks';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface DiagnosesFieldProps {
  diagnoses: string[];
  setDiagnoses: (values: string[]) => void;
}

const DiagnosesField = ({ diagnoses, setDiagnoses }: DiagnosesFieldProps) => {
  const diagnosesList = useAppSelector((state) =>
    state.diagnoses.map((d) => d.code),
  );

  const handleChange = (event: SelectChangeEvent<typeof diagnoses>) => {
    const value = event.target.value;
    setDiagnoses(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <>
      <InputLabel id='diagnoses'>Diagnoses</InputLabel>
      <Select
        multiple
        fullWidth
        labelId='diagnoses'
        value={diagnoses}
        onChange={handleChange}>
        {diagnosesList.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default DiagnosesField;
