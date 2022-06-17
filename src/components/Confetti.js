import React from "react";
import useWindowSize from "../hooks/useWindowDimensions";
import Confetti from "react-confetti";

const ConfettiShow= () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
};

export default ConfettiShow;