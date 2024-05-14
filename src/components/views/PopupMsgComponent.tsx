import React from "react";
import styled from "styled-components";
import { StyledPrimaryButton } from "./Login";

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const StyledModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
  text-align: center;
`;

const StyledModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledModalButton = styled(StyledPrimaryButton)`
  width: 100px;
`;

const StyledModalButtonRed = styled(StyledModalButton)`
  background-color: red;
`;


export function Modal({ text, action, setModal }: {
  text: string,
  action: () => void,
  setModal: (value: boolean) => void
}) {

  function performAction() {
    action();
  }

  return (
    <StyledModalBackground>
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        {text}
        <StyledModalButtonContainer>
          <StyledModalButton onClick={performAction}>Yes</StyledModalButton>
          <StyledModalButtonRed onClick={() => setModal(false)}>No</StyledModalButtonRed>
        </StyledModalButtonContainer>
      </StyledModalContainer>
    </StyledModalBackground>
  );
}