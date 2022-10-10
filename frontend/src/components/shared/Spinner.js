import React from "react";
import styled from "styled-components";
import { FerrisWheelSpinner } from "react-spinner-overlay";

//styled components
const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = () => {
  return (
    <ModalContainer>
      <FerrisWheelSpinner />
    </ModalContainer>
  );
};

export default Spinner;
