import type React from 'react';

interface DateFormInputProps {
  text: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DateFormInput = ({ text, value, setValue }: DateFormInputProps) => {
  const updateValue = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        {text}
        <input type="date" name="date" id="date" value={value} onChange={(e) => updateValue(e)}/>
      </label>
    </div>
  );
};

export default DateFormInput;
