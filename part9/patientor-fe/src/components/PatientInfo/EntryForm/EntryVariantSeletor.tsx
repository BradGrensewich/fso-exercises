import type { EntryType } from ".";

interface EntryVariantSelectorProps {
    setVariant: (value: EntryType) => void,
} 

const EntryVariantSelector = ({setVariant}: EntryVariantSelectorProps) => {
  return (
    <div>
      <h4>Make a new entry:</h4>
      <button onClick={() => setVariant('HealthCheck')}>Health Check</button>
      <button onClick={() => setVariant('OccupationalHealthcare')}>
        Occupational Health Care
      </button>
      <button onClick={() => setVariant('Hospital')}>Hospital</button>
    </div>
  );
};

export default EntryVariantSelector;