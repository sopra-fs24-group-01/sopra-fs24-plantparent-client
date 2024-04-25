import { addCaretaker, getAllUsers, getPlantById } from "../../service/appService";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddUserSVG } from "../../assets/person-add.svg";


const StyledUsersListContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 100px;
  width: 200px;
  z-index: 100;
`;

export const StyledUsersList = styled.div`
  min-height: 20px;
  background-color: white;
  border: 2px solid #83b271;
  border-radius: 5px;
`;

const StyledUserListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px auto;
  padding: 10px;

  &:hover {
    background-color: aliceblue;
  }

  div {
    margin-left: 10px;
  }

  svg:hover {
    cursor: pointer;
    color: #83b271;
  }
`;

export function CaretakerSelectorComponent({ plantId, setShowSelectCaretakers, reloadCaretakers, setReloadCaretakers }: {
  plantId: string,
  setShowSelectCaretakers: (value: boolean) => void,
  reloadCaretakers: boolean,
  setReloadCaretakers: (value: boolean) => void
}) {
  const [users, setUsers] = useState<{ id: number, username: string }[] | null>(null);

  async function getPotentialCaretakers() {
    const fullPlant = await getPlantById(Number(plantId));
    getAllUsers().then(fullUsers => {
      const us: { id: number, username: string }[] = fullUsers.map((u) => {
        if (!fullPlant.caretakers.find(caretaker => caretaker.id === u.id) && u.id !== fullPlant.owner.id) {
          return { id: u.id, username: u.username };
        }
      }).filter(Boolean);
      setUsers(us);
      setReloadCaretakers(false);
    });
  }

  useEffect(() => {
    getPotentialCaretakers().then((users) => console.log(users));
  }, []);

  useEffect(() => {
    if(reloadCaretakers) {
      getPotentialCaretakers().then((users) => console.log(users));
    }
  }, [reloadCaretakers]);

  function addCaretakerToPlant(plantId: number, userId: number) {
    addCaretaker(plantId, userId).then(() => {
      getPotentialCaretakers().then(() => {
        setReloadCaretakers(true)
        setShowSelectCaretakers(false);
      });
    });
  }

  return (
    <StyledUsersListContainer>
      {users === null ? <div>Loading...</div> :
        <StyledUsersList>
          {users.length === 0 ? <div>All users already assigned</div> :
            users.map((u) => {
              return (
                <StyledUserListItemContainer key={u.id}>{u.username}
                  <div title="Add as caretaker">
                    <AddUserSVG onClick={() => addCaretakerToPlant(Number(plantId), Number(u.id))}
                                style={{ width: "30px", height: "30px" }} />
                  </div>
                </StyledUserListItemContainer>
              );
            })}
        </StyledUsersList>}
    </StyledUsersListContainer>
  );

}