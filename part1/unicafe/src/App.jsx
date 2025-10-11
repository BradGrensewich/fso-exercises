import { useState } from 'react';
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  // save clicks of each button to its own state
  const [scores, setScores] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const addClick = (click) => {
    setScores({ ...scores, [click]: scores[`${click}`] + 1 });
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => addClick('good')} text='good' />
      <Button onClick={() => addClick('neutral')} text='neutral' />
     <Button onClick={() => addClick('bad')} text='bad' />
      <h2>Statistics</h2>
      <p>Good: {scores.good}</p>
      <p>Neutral: {scores.neutral}</p>
      <p>Bad: {scores.bad}</p>
    </div>
  );
};

export default App;
