interface EntryVariantSelectorProps {
    setVariant: (value: string) => void,
    variants: string[]
} 

const EntryVariantSelector = ({setVariant, variants}: EntryVariantSelectorProps) => {
  return (
    <div>
      <h4>Make a new entry:</h4>
      <button onClick={() => setVariant(variants[0])}>Health Check</button>
      <button onClick={() => setVariant(variants[1])}>
        Occupational Health Care
      </button>
      <button onClick={() => setVariant(variants[2])}>Hospital</button>
    </div>
  );
};

export default EntryVariantSelector;