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
import { useDispatch } from "react-redux";
import { User, UserSimple } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { getUserById, updateUser } from "../../service/appService";


export default function EditUser() {
  // get the logged in user from the store
  const loggedInUser = useAppSelector(selectLoggedInUser);
  // capture the plantId from the URL
  const { userId } = useParams<{ userId: string }>();
  // get the plant from the store
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUserById(Number(userId));
      setUser(fetchedUser);
      setUsername(fetchedUser.username);
      setEmail(fetchedUser.email);
    }

    fetchUser();
  }, [userId]);

  async function doEditUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const new_user: User = {
      id: Number(userId),
      username: username,
      email: email,
      password: user.password,
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

  function validateEmail(email: string) {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    setIsInputValid(re.test(email));
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
              disabled={(username === "" || email === "" || !isInputValid)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => navigate("/user/" + userId)}>Cancel</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}