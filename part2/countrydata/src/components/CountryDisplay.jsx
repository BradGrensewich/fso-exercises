import CountryList from './CountryList';
import CountryInfo from './CountryInfo';


const CountryDisplay = ({ countries, onCountrySelected }) => {
  if (countries.length > 10 || countries.length === 0) {
    return <div>Too many matches, specify another search query</div>;
  } else if (countries.length > 1) {
    return <CountryList countries={countries} onCountrySelected={onCountrySelected}/>;
  } else {
    return <CountryInfo country={countries[0]} />;
  }
};

export default CountryDisplay;
