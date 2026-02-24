import { TextField, MenuItem } from '@mui/material';
import { HealthCheckRating } from '../../../types';

interface HealthCheckFormFieldsProps {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: (value: HealthCheckRating) => void;
}

const HealthCheckFormFields = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default HealthCheckFormFields;
