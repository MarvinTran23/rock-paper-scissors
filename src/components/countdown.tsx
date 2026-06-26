import { useEffect, useRef, useState } from "react";

type CountdownProps = {
  seconds: number;
  running: boolean;
  onFinish?: () => void;
};

function Countdown({ seconds, running, onFinish }: CountdownProps) {
  const [count, setCount] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running) {
      clear();
      return;
    }

    clear();

    setCount(seconds);

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clear();
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clear;
  }, [running]);

  return <div className="text-6xl font-bold">{count}</div>;
}

export default Countdown;