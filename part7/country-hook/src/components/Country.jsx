const Country = ({ country }) => {
  if (country === null) return null;

  if (!country.found) {
    return <div>not found...</div>;
  }

  const data = country.data;

  return (
    <div>
      <h3>{data.name.common}</h3>
      <div>capital {data.capital}</div>
      <div>population {data.population}</div>
      <img src={data.flags.png} height="100" alt={`flag of ${data.name.common}`} />
    </div>
  );
};

export default Country