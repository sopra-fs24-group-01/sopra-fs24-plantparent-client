import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledForm,
  StyledInputField, StyledLink,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledP, StyledPrimaryButton,
} from "./Login";


export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  function doSignUp() {
    console.log("Sign up for user with user name " + username);
  }

  function validateEmail(email: string) {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    setIsInputValid(re.test(email));
  }

  console.log(!username && !password && !email);
  console.log(isInputValid);
  console.log(email);
  console.log(username);
  console.log(password);

  return (
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{height: '100px', maxWidth: "100%"}} />
        </StyledLogoContainerLarge>
        <StyledForm onSubmit={doSignUp}>
          <StyledInputField id="username"
                            type="text"
                            value={username}
                            validInput = {true}
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)} />
          <StyledInputField id="email"
                            type="text"
                            value={email}
                            validInput = {isInputValid}
                            placeholder="Email"
                            onBlur={(event) => validateEmail(event.target.value)}
                            onChange={(event) => setEmail(event.target.value)} />
          <StyledInputField id="password"
                            type="password"
                            value={password}
                            validInput = {true}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)} />
          <StyledPrimaryButton disabled={!isInputValid && !username && !password && !email} type="submit">Sign Up</StyledPrimaryButton>
          <StyledP>Already have an account? <StyledLink onClick={() => navigate("/login")}>Sign In</StyledLink></StyledP>
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}