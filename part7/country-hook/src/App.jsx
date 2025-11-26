import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    const findCountry = async () => {
      try {
        const info = await axios(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
        );
        console.log({ ...info, found: true });
        setCountry({
          found: true,
          data: info.data,
        });
      } catch (error) {
        setCountry({ found: false });
        console.error(error);
      }
    };
    if (name) findCountry();
  }, [name]);

  return country;
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();

    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
