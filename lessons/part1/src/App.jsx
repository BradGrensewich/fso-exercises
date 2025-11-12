import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter - 1);
  const resetCounter = () => setCounter(0);
  return (
    <>
      <Display counter={counter} />
      <Button onClick={incrementCounter} text='+' />
      <Button onClick={decrementCounter} text='-' />
      <Button onClick={resetCounter} text='Reset' />
    </>
  );
};

export default App;
