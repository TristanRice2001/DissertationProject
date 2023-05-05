import { useEffect, useState } from "react";

const useTimer = () => {
  const countDownStart = new Date().getTime();
  // First set a variable to default to 0
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // as soon as the countdownStart variable is changed, run this function
  useEffect(() => {
    // Once every 1000 miliseconds, add the (current time - the start time) to
    // the secondsElapsed variable
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
