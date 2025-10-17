import { useState, useEffect } from 'react';

import CountryService from './services/countries';
import SearchField from './components/SearchField';
import CountryDisplay from './components/CountryDisplay';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountryService.getAll().then((initial) => setCountries(initial));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query),
  );

  const handleQueryChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };
  return (
    <>
      <SearchField value={query} onChange={handleQueryChange} />
      <CountryDisplay countries={filteredCountries} />
    </>
  );
};

export default App;
