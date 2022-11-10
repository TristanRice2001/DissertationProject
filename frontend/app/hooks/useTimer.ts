import { useEffect, useState } from "react";

const useTimer = () => {
  const countDownStart = new Date().getTime();
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev: number) => {
        return (
          prev + Math.floor((new Date().getTime() - countDownStart) / 1000)
        );
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDownStart]);

  return secondsElapsed;
};

export default useTimer;
