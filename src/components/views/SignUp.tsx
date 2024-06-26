import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField, StyledLink,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledP, StyledPrimaryButton,
} from "./Login";
import { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appError, registerUser } from "../../store/appSlice";


export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [isValidPWConfirm, setIsValidPWConfirm] = useState<boolean>(true);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorMsg = useAppSelector(appError);

  useEffect(() => {
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [errorMsg]);

  async function doSignUp(event: React.FormEvent) {
    event.preventDefault();

    const user: User = {
      username: username,
      email: email,
      password: password,
      plantsOwned: [],
      plantsCaredFor: []
    };
    try {
      await dispatch(registerUser(user)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function validateEmail(email: string) {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    setIsInputValid(re.test(email));
  }

  function validateConfirmPassword(cpw: string) {
    const passwordsMatch = password === cpw;
    setIsValidPWConfirm(passwordsMatch);
  }

  return (
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
        </StyledLogoContainerLarge>
        <StyledForm onSubmit={doSignUp}>
          <StyledInputField id="username"
            type="text"
            value={username}
            $validInput={true}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)} />
          <StyledInputField id="email"
            type="text"
            value={email}
            $validInput={isInputValid}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              validateEmail(event.target.value);}} />
          <StyledInputField id="password"
            type="password"
            value={password}
            $validInput={true}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)} />
          <StyledInputField id="confirm-password"
            type="password"
            value={confirmPassword}
            $validInput={isValidPWConfirm}
            placeholder="Confirm password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              validateConfirmPassword(event.target.value); }}/>
          <StyledPrimaryButton disabled={!isInputValid || !username || !password || !confirmPassword || !email || !isValidPWConfirm}
            type="submit">Sign Up</StyledPrimaryButton>
          <StyledP>Already have an account? <StyledLink onClick={() => navigate("/login")}>Sign
            In</StyledLink></StyledP>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}