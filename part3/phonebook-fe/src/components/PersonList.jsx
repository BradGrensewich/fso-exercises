const PersonItem = ({ person, onRemovePerson }) => {
  return (
    <li>
      {person.name} : {person.number}
      <button onClick={onRemovePerson}>delete</button>
    </li>
  );
};

const PersonList = ({ persons, filter, onRemovePerson }) => {
  const filteredPersons =
    filter.length < 1
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLocaleLowerCase()),
        );

  return (
    <ul>
      {filteredPersons.map((p) => (
        <PersonItem
          key={p.id}
          person={p}
          onRemovePerson={() => onRemovePerson(p.id)}
        />
      ))}
    </ul>
  );
};

export default PersonList;
