import { useState } from 'react';
import EntryVariantSelector from './EntryVariantSeletor';
import BaseEntryForm from './BaseEntryForm';

interface EntryFormProps {
  patientId: string;
}

export type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' | '';

const EntryForm = ({ patientId }: EntryFormProps) => {
  const [variant, setVariant] = useState<EntryType>('');

  if (variant === '') {
    return <EntryVariantSelector setVariant={setVariant} />;
  } else {
    return (
      <BaseEntryForm
        patientId={patientId}
        variant={variant}
        setVariant={setVariant}
      />
    );
  }
};

export default EntryForm;
