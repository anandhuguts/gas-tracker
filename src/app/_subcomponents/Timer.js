import { useEffect, useState } from "react";

function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) return 6;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-2.5">
      <span className="font-dsans text-[18px] text-white ">
        Next update in: {secondsLeft}s
      </span>
    </div>
  );
}

export default Timer;
