import { useState } from "react";

export const useToggle = (initial: boolean = false): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(initial);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };
  return [isToggled, toggle];
};
