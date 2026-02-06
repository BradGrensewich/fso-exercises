import type React from 'react';

interface RadioFormInputProps {
  text: string;
  variant: 'visibility' | 'weather';
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioFormInput = ({ text, variant, setValue }: RadioFormInputProps) => {
  const options =
    (variant === 'visibility')
      ? ['great', 'good', 'ok', 'poor']
      : ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

  const updateValue = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        {text}
        {options.map((o) => (
          <span key={o}>
            <input
              type='radio'
              name={variant}
              value={o}
              onChange={updateValue}
            />
            {o}
          </span>
        ))}
      </label>
    </div>
  );
};

export default RadioFormInput;
