const PersonItem = ({ person }) => {
  return (
    <li>
      {person.name} : {person.number}
    </li>
  );
};

const PersonList = ({persons}) => {
  return (
    <ul>
        {persons.map((p) => (
          <PersonItem key={p.name} person={p} />
        ))}
      </ul>
  )
}

export default PersonList