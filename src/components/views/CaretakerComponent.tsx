import { getPlantById, removeCaretaker } from "../../service/appService";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as RemoveUserSVG } from "../../assets/person-fill-dash.svg";
import { StyledUsersList } from "./CaretakerSelectorComponent";

const StyledCaretakersTitle = styled.div`
  color: #000000;
  font-size: 2.5rem;
  margin: 0 auto;
`;

const StyledNoCaretakers = styled.div`
  padding: 5px;
  font-size: 1.5rem;
  color: #83b271;
  
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledCaretakersContainer = styled.div`
  margin: 15px;
  border: 2px solid #83b271;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  margin: 5px;
  padding: 10px;

  &:hover {
    background-color: aliceblue;
  }

  div {
    margin-left: 10px;
  }

  svg:hover {
    cursor: pointer;
    color: #ff0000;
  }
`;

export function CaretakerComponent({ plantId, setShowSelectCaretakers, reloadCaretakers, setReloadCaretakers }: {
  plantId: string,
  setShowSelectCaretakers: (value: boolean) => void,
  reloadCaretakers: boolean,
  setReloadCaretakers: (value: boolean) => void
}) {
  const [users, setUsers] = useState<{ id: number, username: string }[] | null>(null);

  async function getCaretakers() {
    const fullPlant = await getPlantById(Number(plantId));
    const us = fullPlant.caretakers.reduce((unique, c) => {
      if (unique.findIndex(u => u.id === c.id) === -1) {
        unique.push({ id: c.id, username: c.username });
      }
      return unique;
    }, [] as { id: number, username: string }[]);
    setUsers(us);
    setReloadCaretakers(false);
  }

  useEffect(() => {
    getCaretakers().then((users) => console.log(users));
  }, []);

  useEffect(() => {
    if (reloadCaretakers) {
      getCaretakers().then((users) => console.log(users));
    }
  }, [reloadCaretakers]);

  function removeCaretakerFromPlant(plantId: number, userId: number) {
    removeCaretaker(plantId, userId).then(() => {
      getCaretakers().then(() => {
        setReloadCaretakers(true);
        setShowSelectCaretakers(false);
      });
    });
  }

  return (
    <>
      <StyledCaretakersTitle>Caretakers</StyledCaretakersTitle>
      <StyledCaretakersContainer>
      {users === null || users.length === 0 ?
      <StyledNoCaretakers>No caretakers added yet. <span onClick={() => setShowSelectCaretakers(true)}>Add one!</span></StyledNoCaretakers> :
        <>
          {users.map((u) => {
            return (
              <StyledUserContainer key={u.id}>{u.username}
                <div title="Remove caretaker">
                  <RemoveUserSVG onClick={() => removeCaretakerFromPlant(Number(plantId), Number(u.id))}
                                 style={{ width: "30px", height: "30px" }} />
                </div>
              </StyledUserContainer>
            );
          })}
        </>
      }
      </StyledCaretakersContainer>
    </>
  );

}