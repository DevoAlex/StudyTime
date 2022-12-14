import React from "react";
import { Spinner, SpinnerContainer } from "./LoadingSpinner.style";

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
