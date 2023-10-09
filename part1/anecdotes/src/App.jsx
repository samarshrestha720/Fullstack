import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const arrLen = anecdotes.length - 1;
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(arrLen).fill(0));
  const [highest, setHighest] = useState(0);

  const clickEvent = () => {
    const arrVal = Math.floor(Math.random() * arrLen);
    setSelected(arrVal);
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    const highestIndex = copy.indexOf(Math.max(...copy));
    setHighest(highestIndex);
    setPoints(copy);
  };

  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={clickEvent} text="Next Anecdote" />
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {points[highest]} votes</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

export default App;
