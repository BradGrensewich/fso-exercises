import { useState, useEffect } from 'react';

import CountryService from './services/countries';
import SearchField from './components/SearchField';
import CountryDisplay from './components/CountryDisplay';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    CountryService.getAll().then((initial) => setCountries(initial));
  }, []);  

  const handleQueryChange = (event) => {
    const newQuery = event.target.value.toLowerCase() 
    setQuery(newQuery);
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(newQuery)))
  };

  const handleCountrySelected = (tld) => {    
    setFilteredCountries(filteredCountries.filter(country => country.tld[0] === tld))
  }
  return (
    <>
      <SearchField value={query} onChange={handleQueryChange} />
      <CountryDisplay countries={filteredCountries} onCountrySelected={handleCountrySelected} />
    </>
  );
};

export default App;
