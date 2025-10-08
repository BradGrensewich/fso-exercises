const Hello = (props) => {
  return (
    <p>
      Hello {props.name}. You are {props.age}
    </p>
  );
};
const App = () => {
  const now = new Date();
  const age = 2025 - 1993;
  return (
    <div>
      <Hello name='Brad' age={age} />
      <p>It is {now.toString()}</p>
    </div>
  );
};

export default App;
