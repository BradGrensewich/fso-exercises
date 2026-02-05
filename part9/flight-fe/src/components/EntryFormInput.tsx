import type React from 'react';

interface EntryFormInputProps {
  text: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EntryFormInput = ({ text, value, setValue }: EntryFormInputProps) => {
  const updateValue = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        {text}
        <input value={value} onChange={(e) => updateValue(e)} />
      </label>
    </div>
  );
};

export default EntryFormInput;
