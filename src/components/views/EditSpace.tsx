import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { Space, SpaceSimple } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { getSpace, updateSpace } from "../../service/appService";
import styled from "styled-components";
import { InputFieldComponent } from "./InputFieldComponent";
import { StyledDeleteButton } from "./PlantView";

export const StyledPageTitle = styled.h1`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto 50px auto;
`;


export default function EditSpace() {
  // get the logged-in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // capture the plantId from the URL
  const { spaceId } = useParams<{ spaceId: string }>();
  // get the plant from the store
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [space, setSpace] = useState<Space | null>(null);
  const [spaceName, setSpaceName] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSpace() {
      const fetchedSpace = await getSpace(Number(spaceId));
      setSpace(fetchedSpace);
      setSpaceName(fetchedSpace.spaceName);
    }

    fetchSpace().then();
  }, [spaceId]);

  async function doEditSpace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedSpace: SpaceSimple = {
      spaceId: Number(spaceId),
      spaceName: spaceName,
      spaceOwner: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password
      },
      spaceMembers: space.spaceMembers,
      plantsContained: space.plantsContained
    };
    try {
      await updateSpace(updatedSpace);
      navigate("/spaces/" + spaceId);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  if (!space) {
    return <div>Loading...</div>;
  }

  return (
    appStatus !== "succeeded" ? <div>Loading...</div> :
      <StyledMainContainer>
        <StyledLoginContainer>
          <StyledLogoContainerLarge>
            <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
          </StyledLogoContainerLarge>
          <StyledPageTitle>Edit Space</StyledPageTitle>
          <StyledForm onSubmit={doEditSpace}>
            <InputFieldComponent
              id={"spaceName"}
              type={"text"}
              validInput={true}
              placeholder={"Space name"}
              value={spaceName}
              onChange={setSpaceName}
              tooltip={"The name your room/space."}/>
            <StyledPrimaryButton
              disabled={(spaceName === "") || (spaceName === space.spaceName)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledDeleteButton onClick={() => navigate("/spaces/" + spaceId)}>Cancel</StyledDeleteButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}