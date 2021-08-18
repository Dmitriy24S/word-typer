import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(3);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [intervalIDd, setInterID] = useState();
  const [value, setValue] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const wordArray = [
    "hat",
    "river",
    "lucky",
    "statue",
    "generate",
    "stubborn",
    "cocktail",
    "runaway",
    "joke",
    "developer",
    "establishment",
    "hero",
    "javascript",
    "nutrition",
    "revolver",
    "echo",
    "siblings",
    "investigate",
    "horrendous",
    "symptom",
    "laughter",
    "magic",
    "master",
    "space",
    "definition",
  ];

  // Pick & show random word
  // const randomWord = (wordArray) => {
  const randomWord = () => {
    // Generate random array index
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // Output random word
    setCurrentWord(wordArray[randomIndex]);
  };

  const countDown = () => {
    if (time > 0) {
      setTime((n) => n - 1);
    }
  };

  const play = () => {
    if (value === currentWord && value !== "") {
      setGameStatus("correct");
      randomWord();
      setValue("");
      setTime(3);
      setScore((n) => n + 1);
    }
    if (time === 0 && value === currentWord && value !== "") {
      setGameStatus("game-start");
      randomWord();
      setTime(3);
      setScore(0);
    }
  };

  useEffect(() => {
    if (!currentWord) {
      randomWord();
    }
    play();
  }, [play]);

  useEffect(() => {
    let intervalId;
    if (time > 0) {
      intervalId = setInterval(() => {
        countDown();
        setInterID(intervalId);
      }, 1000);
    }
    if (time === 0) {
      clearInterval(intervalIDd);
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIDd);
      if (time === 0) {
        clearInterval(intervalIDd);
        clearInterval(intervalId);
      }
    };
  }, [intervalIDd, time]);

  const gameStatusOutput = () => {
    if (time === 0) return <h3>Game Over</h3>;
    if (gameStatus === "game-start") return <h3>Game Started</h3>;
    if (gameStatus === "correct") return <h3>Correct</h3>;
    if (value === "") return "";
    else return "";
  };

  return (
    <>
      <header className="bg-secondary p-3 mb-5">
        <h1>Word Typer</h1>
      </header>
      <div className="App">
        <div className="col-6 mx-auto">
          <p>
            Type The Given Word Within <span className="text-success">3 </span>
            Seconds:
          </p>
          <h2 className="display-2 mb-5" id="current-word">
            {currentWord}
          </h2>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Start typing..."
            autoFocus
            value={value}
            onChange={handleChange}
          />
          <div className="game-status mt-3">{gameStatusOutput()}</div>
          <div className="row mt-5">
            <h3 className="col-6">Time Left: {time}</h3>
            <h3 className="col-6">Score: {score}</h3>
          </div>
          <div className="col-12 mt-5">
            <div className="instructions card card-body bg-secondary ">
              <h5>Instructions</h5>
              <p>
                Type each word in the given amount of seconds to score. To play
                again, just type the current word. Your score will reset
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
