import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";


export const StyledMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
`;

export const StyledLoginContainer = styled.div`
  border: 2px solid #83b271;
  border-radius: 5px;
  margin: 100px auto;
  width: 50vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

export const StyledLogoContainerLarge = styled.div`
  height: fit-content;
  margin: 0 auto 100px auto;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
`;

export const StyledInputField = styled.input<{ backgroundImage?: string , validInput?: boolean}>`
  font-size: 1.5rem;
  padding: 0 15px;
  width: 350px;
  height: 40px;
  background-image: url("${props => props.backgroundImage || ""}");
  border: ${props => props.validInput ? "" : "2px solid red"};
  margin: 20px auto;
  border-radius: 5px;
`;

export const StyledPrimaryButton = styled.button`
  color: #ffffff;
  font-size: 1.5rem;
  background-color: #83b271;
  width: 380px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 50px auto 5px auto;
  
  &:hover{
    cursor: pointer;
    scale: 0.95;
  } 
`;

export const StyledP = styled.p`
  font-size: 1rem;
  margin: 5px auto;
`;

export const StyledLink = styled.a`
  color: #83b271;
  text-decoration: underline;
  transition: width 0.2s;
  position: relative;

  &:visited {
    color: #83b271;
  }
  &:hover{
    cursor: pointer;
    scale: 0.95;
  }
  
  &:after {
    content: "";
    background-color: #000000;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    transition: 0.2s;
  }
  &:hover:after {
    width: 100%;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  function doLogin() {
    console.log("Login for user with user name " + username);
  }

  return (
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{height: '100px', maxWidth: "100%"}} />
        </StyledLogoContainerLarge>
        <StyledForm onSubmit={doLogin}>
          <StyledInputField id="username"
                            type="text"
                            value={username}
                            validInput = {true}
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)} />
          <StyledInputField id="password"
                            type="password"
                            value={password}
                            validInput = {true}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)} />
          <StyledPrimaryButton disabled={!username && !password} type="submit">Login</StyledPrimaryButton>
          <StyledP>No account yet? <StyledLink onClick={() => navigate("/signUp")}>Sign Up</StyledLink></StyledP>
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}