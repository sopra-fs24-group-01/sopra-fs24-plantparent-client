import React, { useState } from "react";
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
import { registerUser, userError } from "../../store/userSlice";
import { User } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";


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
  const errorMsg = useAppSelector(userError);

  async function doSignUp(event: React.FormEvent) {
    event.preventDefault();
    console.log("Sign up for user with user name " + username);

    const user: User = {
      username: username,
      email: email,
      password: password
    };
    try {
      await dispatch(registerUser(user)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(errorMsg);
    }
  }

  function validateEmail(email: string) {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    setIsInputValid(re.test(email));
  }

  function validateConfirmPassword(cpw: string) {
    const passwordsMatch = password === cpw;
    console.log(passwordsMatch);
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
                            onBlur={(event) => validateEmail(event.target.value)}
                            onChange={(event) => setEmail(event.target.value)} />
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
                            onBlur={(event) => validateConfirmPassword(event.target.value)}
                            onChange={(event) => setConfirmPassword(event.target.value)} />
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