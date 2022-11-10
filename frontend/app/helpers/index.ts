export const convertSecondsToReadableTimeFormat = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 60) % 60);
  const secondsLeft = seconds % 60;
  return `${hours}:${minutes}:${secondsLeft}`;
};
