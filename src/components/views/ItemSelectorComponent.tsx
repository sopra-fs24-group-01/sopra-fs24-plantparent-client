import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddUserSVG } from "../../assets/person-add.svg";

export const StyledItemsListContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 100px;
  width: 200px;
  z-index: 100;
`;

export const StyledItemsList = styled.div`
  min-height: 20px;
  background-color: white;
  border: 2px solid #83b271;
  border-radius: 5px;
`;

export const StyledItemsListItemContainer = styled.div`
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

export function ItemsSelectorComponent({ itemId, setShowSelectItems, reloadItems, setReloadItems, getPotentialItem, addItem, getAllItems, fullItemKey, nameKey, ignoreId, itemName}: {
  itemId: string,
  setShowSelectItems: (value: boolean) => void,
  reloadItems: boolean,
  setReloadItems: (value: boolean) => void,
  getPotentialItem: (id: number) => Promise<any>,
  addItem: (mainItemId: number, itemId: number) => Promise<void>,
  getAllItems: () => Promise<any>,
  fullItemKey: string,
  nameKey: string,
  ignoreId: number
  itemName: string
}) {
  const [items, setItems] = useState<{ id: number, name: string }[] | null>(null);

  async function getItems() {
    const fullItem = await getPotentialItem(Number(itemId));
    getAllItems().then(fullItems => {
      const is: { id: number, name: string }[] = fullItems.map((i) => {
        if (!fullItem[fullItemKey].find(containedItem => containedItem.id === i.id) && i.id !== ignoreId) {
          return { id: i.id, name: i[nameKey] };
        }
      }).filter(Boolean);
      setItems(is);
      setReloadItems(false);
    });
  }

  useEffect(() => {
    getItems().then();
  }, []);

  useEffect(() => {
    if(reloadItems) {
      getItems().then();
    }
  }, [reloadItems]);

  function addItemToMainItem(mainItemId: number, itemId: number) {
    addItem(mainItemId, itemId).then(() => {
      getItems().then(() => {
        setReloadItems(true)
        setShowSelectItems(false);
      });
    });
  }

  return (
    <StyledItemsListContainer>
      {items === null ? <div>Loading...</div> :
        <StyledItemsList>
          {items.length === 0 ? <div>All {itemName}s already assigned</div> :
            items.map((i) => {
              return (
                <StyledItemsListItemContainer key={i.id}>{i.name}
                  <div title="Add as caretaker">
                    <AddUserSVG onClick={() => addItemToMainItem(Number(itemId), Number(i.id))}
                      style={{ width: "30px", height: "30px" }} />
                  </div>
                </StyledItemsListItemContainer>
              );
            })}
        </StyledItemsList>}
    </StyledItemsListContainer>
  );

}