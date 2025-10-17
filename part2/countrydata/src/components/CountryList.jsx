const CountryListItem = ({country, onSelect}) => {
    return(
        <li>{country.name.common} <button onClick={onSelect}>show</button></li>
    )
}

const CountryList = ({countries, onCountrySelected}) => {
    return (
        <ul>
            {countries.map(country => <CountryListItem key={country.tld[0]} country={country} onSelect={() => onCountrySelected(country.tld[0])}/>)}
        </ul>
    )
}

export default CountryList