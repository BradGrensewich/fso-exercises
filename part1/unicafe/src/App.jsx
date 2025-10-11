import { useState } from 'react';
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ scores }) => {
  const all = scores.good + scores.bad + scores.neutral;
  const avg = (scores.good - scores.bad) / all;
  const goodPercentage = (scores.good / all) * 100.0;
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {scores.good}</p>
      <p>Neutral: {scores.neutral}</p>
      <p>Bad: {scores.bad}</p>
      <p>All: {all}</p>
      <p>Average: {avg}</p>
      <p>Positive: {goodPercentage}</p>
    </div>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [scores, setScores] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  //stats

  const addClick = (click) => {
    setScores({ ...scores, [click]: scores[`${click}`] + 1 });
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={() => addClick('good')} text='good' />
      <Button onClick={() => addClick('neutral')} text='neutral' />
      <Button onClick={() => addClick('bad')} text='bad' />
      <Statistics scores={scores} />
    </div>
  );
};

export default App;
