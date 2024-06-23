import { useEffect, useRef, useState } from "react";

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [canReset, setReset] = useState<boolean>(false);
  const intervalIdRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    console.log("useEffect");
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    changePointerEvents("stop", false);
    changePointerEvents("reset", false);
  }, []);

  function changePointerEvents(elementId : string, value : boolean){
    document.getElementById(elementId)!.style.pointerEvents = value ? "auto" : "none";
  }
  function start() {
    changePointerEvents("start", false);
    changePointerEvents("stop", true);
    changePointerEvents("reset", true);
    setIsRunning(true);
    setReset(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {+
    changePointerEvents("start", true);
    changePointerEvents("stop", false);
    changePointerEvents("reset", true);
    setIsRunning(false);
    setReset(true);
  }

  function reset() {
    changePointerEvents("start", true);
    changePointerEvents("stop", false);
    changePointerEvents("reset", false);
    setElapsedTime(0);
    setIsRunning(false);
    setReset(false);
  }

  function formatTime(): string {
    const minutes: number = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds: number = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds: number = Math.floor((elapsedTime % 1000) / 10);

    const minutesStr: string = String(minutes).padStart(2, "0");
    const secondsStr: string = String(seconds).padStart(2, "0");
    const millisecondsStr: string = String(milliseconds).padStart(2, "0");

    return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button
          id="start"
          onClick={start}
          className="start-button"
          disabled={isRunning}
        >
          Başlat
        </button>
        <button
          id="stop"
          onClick={stop}
          className="stop-button"
          disabled={!isRunning}
        >
          Durdur
        </button>
        <button
          id="reset"
          onClick={reset}
          className="reset-button"
          disabled={!canReset}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}
