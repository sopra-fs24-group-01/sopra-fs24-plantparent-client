import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { User, UserSimple } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { getUserById, updateUser } from "../../service/appService";


export default function EditPassword() {
  // get the logged in user from the store
  const loggedInUser = useAppSelector(selectLoggedInUser);
  // capture the plantId from the URL
  const { userId } = useParams<{ userId: string }>();
  // get the plant from the store
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidPWConfirm, setIsValidPWConfirm] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUserById(Number(userId));
      setUser(fetchedUser);
      setPassword(fetchedUser.password);
    }

    fetchUser();
  }, [userId]);

  async function doEditPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const new_user: User = {
      id: Number(userId),
      username: user.username,
      email: user.email,
      password: password,
      plantsCaredFor: user.plantsCaredFor,
      plantsOwned: user.plantsOwned,
    };

    try {
      await updateUser(new_user);
      navigate("/user/" + userId);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  function validateConfirmPassword(cpw: string) {
    const passwordsMatch = password === cpw;
    console.log(passwordsMatch);
    setIsValidPWConfirm(passwordsMatch);
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  
  if (user.id !== loggedInUser?.id) {
    return <div>Unauthorized</div>
  }

  return (
    appStatus !== "succeeded" ? <div>Loading...</div> :
      <StyledMainContainer>
        <StyledLoginContainer>
          <StyledLogoContainerLarge>
            <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
          </StyledLogoContainerLarge>
          <StyledForm onSubmit={doEditPassword}>
            <label htmlFor="old-password">Old Password</label>
            <StyledInputField id="old-password"
                            type="password"
                            value={oldPassword}
                            $validInput={true}
                            placeholder="Old Password"
                            onChange={(event) => setOldPassword(event.target.value)} />
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
                            onBlur={(event) => validateConfirmPassword(event.target.value)}
                            onChange={(event) => setConfirmPassword(event.target.value)} />
            <StyledPrimaryButton
              disabled={(password === "" || oldPassword !== user.password || !isValidPWConfirm)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => navigate("/user/" + userId)}>Cancel</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}