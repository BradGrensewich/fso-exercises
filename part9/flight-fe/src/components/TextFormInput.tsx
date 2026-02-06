import type React from 'react';

interface TextFormInputProps {
  text: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextFormInput = ({ text, value, setValue }: TextFormInputProps) => {
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

export default TextFormInput;
