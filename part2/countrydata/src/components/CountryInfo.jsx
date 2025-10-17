const LanguageList = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  );
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <p>Population {country.population}</p>
      <h1>Languages</h1>
     <LanguageList languages={country.languages} />
     <img src={country.flags.png} alt="" />
    </div>
  );
};

export default CountryInfo