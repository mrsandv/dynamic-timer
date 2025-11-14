import { useEffect, useState } from "react";
import "./App.css";

function Timer() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [delay, setDelay] = useState(1000);

  const handlePause = () => setIsPaused(!isPaused);

  const handleStop = () => {
    setTime(0);
    setIsPaused(true);
  };

  const handleSpeedChange = (e) => {
    let value = Number(e.target.value);
    if (value <= 0) value = 0;
    setDelay(value);
  };

  useEffect(() => {
    if (isPaused || delay <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, delay);

    return () => clearInterval(timer);
  }, [isPaused, delay]);

  return (
    <div className="App">
      <main className="Wrapper">
        <h1 className="Header">Dynamic counter</h1>
        <h1 className="Counter">{time}</h1>
        <div className="Controls">
          <button
            className={`Btn ${isPaused ? "Stop" : ""}`}
            type="button"
            onClick={handlePause}
          >
            {isPaused ? "Play" : "Pause"}
          </button>
          <button
            className="Btn"
            type="button"
            onClick={handleStop}
            disabled={isPaused}
          >
            Reset
          </button>
        </div>

        <div className="SpeedControl">
          <label className="Label">
            Speed (ms):
            <input
              type="number"
              value={delay}
              onChange={handleSpeedChange}
              step="100"
              min="100"
            />
          </label>
          <small>Current speed: {delay / 1000}s</small>
        </div>
      </main>
    </div>
  );
}

export default Timer;
