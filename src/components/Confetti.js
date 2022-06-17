import React from "react";
import useWindowSize from "../hooks/useWindowDimensions";
import Confetti from "react-confetti";

// Conffetti celebration for the end of the game
const ConfettiShow= () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
};

export default ConfettiShow;