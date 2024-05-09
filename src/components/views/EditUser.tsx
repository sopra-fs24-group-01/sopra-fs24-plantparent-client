import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { UserSimple } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser, updateUserRedux } from "../../store/appSlice";

export default function EditUser() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUser() {
      if (loggedInUser) {
        setUsername(loggedInUser.username);
        setEmail(loggedInUser.email);
      }
    }

    fetchUser().then();
  }, [loggedInUser]);

  async function doEditUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const new_user: UserSimple = {
      id: loggedInUser.id,
      username: username,
      email: email,
      password: loggedInUser.password, // Backend doesn't provide password. Needs to be implemented.
    };

    try {
      dispatch(updateUserRedux(new_user));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    setIsInputValid(re.test(email));
  }

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    appStatus !== "succeeded" ? <div>Loading...</div> :
      <StyledMainContainer>
        <StyledLoginContainer>
          <StyledLogoContainerLarge>
            <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
          </StyledLogoContainerLarge>
          <StyledForm onSubmit={doEditUser}>
            <label htmlFor="username">Username</label>
            <StyledInputField id="username"
              type="text"
              value={username}
              $validInput={true}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)} />
            <label htmlFor="email">Email</label>
            <StyledInputField id="email"
              type="text"
              value={email}
              $validInput={isInputValid}
              placeholder="Email"
              onBlur={(event) => validateEmail(event.target.value)}
              onChange={(event) => setEmail(event.target.value)} />
            <StyledPrimaryButton
              disabled={username === "" || email === "" || !isInputValid ||
                (username === loggedInUser.username && email === loggedInUser.email)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => navigate("/profile")}>Cancel</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}