import React from "react";
import styled from "styled-components";
import { ReactComponent as TooltipSVG } from "../../assets/info-square.svg";

export const StyledInputFiledContainer = styled.div`
  position: relative
`;
const StyledInputField = styled.input<{ $backgroundImage?: string, $validInput?: boolean }>`
  font-size: 1.5rem;
  padding: 0 15px;
  width: 350px;
  height: 40px;
  background-image: url("${props => props.$backgroundImage || ""}");
  border: ${props => props.$validInput !== false ? "" : "2px solid red"};
  margin: 20px auto;
  border-radius: 5px;
`;

export const StyledTooltipContainer = styled.div<{$toTheRight?: boolean}>`
  position: absolute;
  right: 5px;
  top: 25px;

  &:hover {
    cursor: pointer;
  }

  svg:hover {
    fill: #83b271;
  }
  
  ${props => props.$toTheRight && `
    right: -25px;
  `}
`;

export interface InputFieldComponentProps {
  id: string,
  type: string,
  validInput: boolean,
  placeholder: string,
  value: string | number | Date,
  onChange: React.Dispatch<React.SetStateAction<any>>
  max?: string,
  tooltip?: string
}

export function InputFieldComponent({
  id,
  type,
  validInput,
  placeholder,
  value,
  onChange,
  max,
  tooltip,
}: InputFieldComponentProps) {
  function eventHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (type === "number") {
      let value = Number(event.target.value);
      if (value < 0) {
        value = 0;
      }
      onChange(value);
    } else {
      onChange(event.target.value);
    }
  }

  return (
    <StyledInputFiledContainer>
      <StyledInputField id={id}
        type={type}
        min={type === "number" ? 0 : undefined}
        max={max !== undefined ? max : ""}
        value={value}
        $validInput={validInput}
        placeholder={placeholder}
        onChange={eventHandler} />
      {tooltip &&
        <StyledTooltipContainer title={tooltip} $toTheRight={type === "number"}>
          <TooltipSVG style={{
            color: "#2f2f2f",
            width: max !== undefined ? "15px": "20px",
            height: max !== undefined ? "15px": "20px",
          }} />
        </StyledTooltipContainer>}
    </StyledInputFiledContainer>
  );
}