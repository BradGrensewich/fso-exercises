const SearchField = ({query, onChange}) => {
  return (
    <form>
      find countries
      <input type='text' value={query} onChange={onChange} />
    </form>
  );
};

export default SearchField