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


export default function EditPassword() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidPWConfirm, setIsValidPWConfirm] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  async function doEditPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const new_user: UserSimple = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      email: loggedInUser.email,
      password: password,
    };

    try {
      dispatch(updateUserRedux(new_user));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    setIsValidPWConfirm(password === confirmPassword);

  }, [password, confirmPassword]);

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
          <StyledForm onSubmit={doEditPassword}>
            <label htmlFor="new-password">New Password</label>
            <StyledInputField id="new-password"
              type="password"
              value={password}
              $validInput={true}
              placeholder="New Password"
              onChange={(event) => setPassword(event.target.value)} />
            <label htmlFor="confirm-password">Confirm New Password</label>
            <StyledInputField id="confirm-password"
              type="password"
              value={confirmPassword}
              $validInput={isValidPWConfirm}
              placeholder="Confirm New Password"
              onChange={(event) => setConfirmPassword(event.target.value)} />
            <StyledPrimaryButton
              disabled={(password === "" || !isValidPWConfirm)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => navigate("/profile")}>Cancel</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}