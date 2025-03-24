import React, { useState, useRef } from "react";
import "./App.css";

const useWatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const interval = useRef(0);

  const start = () => {
    if (interval.current) return;

    interval.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = 0;
    }
  };

  const reset = () => {};

  const time = { minutes, seconds };

  return { start, stop, reset, time };
};

export function App() {
  const { start, stop, reset, time } = useWatch();

  const { minutes, seconds } = time;

  return (
    <div className="App">
      <h1>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default App;
