import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { SpaceSimple } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  appError,
  getSpaces,
  selectLoggedInUser,
} from "../../store/appSlice";
import { createSpace } from "../../service/appService";
import styled from "styled-components";
import { InputFieldComponent } from "./InputFieldComponent";
import { StyledDeleteButton } from "./PlantView";

export const StyledPageTitle = styled.h1`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto 50px auto;
`;


export default function CreateSpace() {
  const user = useAppSelector(selectLoggedInUser);
  const [spaceName, setSpaceName] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector(appError);


  useEffect(() => {
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [errorMsg]);

  async function doCreateSpace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newSpace: SpaceSimple = {
      spaceName: spaceName,
      spaceOwner: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password
      },
      spaceMembers: [],
      plantsContained: []
    };
    try {
      await createSpace(newSpace);
      dispatch(getSpaces(user.id));
      navigate("/");
    } catch (err) {
      setError(err.message)
      console.log(err);
    }
  }

  return (
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
        </StyledLogoContainerLarge>
        <StyledPageTitle>Create Space</StyledPageTitle>
        <StyledForm onSubmit={doCreateSpace}>
          <InputFieldComponent
            id={"spaceName"}
            type={"text"}
            validInput={true}
            placeholder={"Space name"}
            value={spaceName}
            onChange={setSpaceName}
            tooltip={"The name your room/space."}/>
          <StyledPrimaryButton
            disabled={(spaceName === "")}
            type="submit">Save Changes</StyledPrimaryButton>
          <StyledDeleteButton onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            window.history.back()}}
          >Cancel</StyledDeleteButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}