const CountryListItem = ({country}) => {
    return(
        <li>{country.name.common}</li>
    )
}

const CountryList = ({countries}) => {
    return (
        <ul>
            {countries.map(country => <CountryListItem key={country.tld[0]} country={country}/>)}
        </ul>
    )
}

export default CountryList