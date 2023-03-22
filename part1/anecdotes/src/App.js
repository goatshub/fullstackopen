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

  const [selected, setSelected] = useState(0);
  const [maxIndex, setMaxIndex] = useState(undefined);
  const [voteCount, setVoteCount] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    //random int between 0 and length of anecdotes (maximum not inclusive)
    let randomAnecdoteNumber = Math.floor(Math.random() * anecdotes.length);
    //use while to make sure that the new random number is not equal to selected number
    while (randomAnecdoteNumber === selected) {
      randomAnecdoteNumber = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomAnecdoteNumber);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voteCount[selected]} votes</p>
      <button
        onClick={() => {
          setVoteCount((prev) => {
            let count = [...prev];
            count[selected] += 1;
            const max = Math.max(...count);
            const maxIndexOf = count.indexOf(max);
            setMaxIndex(maxIndexOf);
            return count;
          });
        }}
      >
        vote
      </button>
      <button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{maxIndex !== undefined ? anecdotes[maxIndex] : "No vote yet"}</p>
    </div>
  );
};

export default App;
