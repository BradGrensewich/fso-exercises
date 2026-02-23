import { useState } from 'react';
import EntryVariantSelector from './EntryVariantSeletor';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthCareEntryForm from './OccupationalHealthCareEntryForm';
import HospitalEntryForm from './HospitalEntryForm';

interface EntryFormProps {
  patientId: string;
}

const EntryForm = ({ patientId }: EntryFormProps) => {
  const variants = ['HealthCheck', 'OccupationalHealthCare', 'Hospital'];
  const [variant, setVariant] = useState<string>('');

  switch (variant) {
    case variants[0]:
      return <HealthCheckEntryForm patientId={patientId} setVariant={setVariant} />;
    case variants[1]:
      return <OccupationalHealthCareEntryForm patientId={patientId} setVariant={setVariant} />;
    case variants[2]:
      return <HospitalEntryForm patientId={patientId} setVariant={setVariant} />;

    default:
      return (
        <EntryVariantSelector setVariant={setVariant} variants={variants} />
      );
  }
};

export default EntryForm;
