import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledItemsTitle = styled.div`
  color: #000000;
  font-size: 2.5rem;
  margin: 0 auto;
`;

const StyledNoItems = styled.div`
  padding: 5px;
  font-size: 1.5rem;
  color: #83b271;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledItemsContainer = styled.div`
  margin: 15px;
  border: 2px solid #83b271;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledItemContainer = styled.div`
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

export function ItemsComponent({
  itemId,
  setShowSelectItems,
  reloadItems,
  setReloadItems,
  getPotentialItem,
  removeItem,
  fullItemKey,
  idKey,
  nameKey,
  ignoreId,
  itemTitle,
  itemName,
  RemoveSVG,
  edit
}: {
  itemId: string,
  setShowSelectItems: (value: boolean) => void,
  reloadItems: boolean,
  setReloadItems: (value: boolean) => void,
  getPotentialItem: (id: number) => Promise<any>,
  removeItem: (mainItemId: number, itemId: number) => Promise<void>,
  fullItemKey: string,
  idKey: string,
  nameKey: string,
  ignoreId: number,
  itemTitle: string,
  itemName: string,
  RemoveSVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  edit: boolean
}) {
  const [items, setItems] = useState<{ id: number, name: string }[] | null>(null);

  async function getItems() {
    const fullItem = await getPotentialItem(Number(itemId));
    const is = fullItem[fullItemKey].reduce((unique, i) => {
      if (unique.findIndex(u => u[idKey] === i[idKey]) === -1) {
        unique.push({ id: i[idKey], name: i[nameKey] });
      }

      return unique;
    }, [] as { id: number, name: string }[]);
    setItems(is);
    setReloadItems(false);
  }

  useEffect(() => {
    getItems().then();
  }, [itemId]);

  useEffect(() => {
    if (reloadItems) {
      getItems().then();
    }
  }, [reloadItems]);

  function removeItemFromMainItem(mainItemId: number, itemId: number) {
    removeItem(mainItemId, itemId).then(() => {
      getItems().then(() => {
        setReloadItems(true);
        setShowSelectItems(false);
      });
    });
  }

  return (
    <>
      <StyledItemsTitle>{itemTitle}</StyledItemsTitle>
      <StyledItemsContainer>
        {items === null || items.length === 0 ?
          <StyledNoItems>No {itemName}s added yet. {edit && <span
            onClick={() => setShowSelectItems(true)}>Add one!</span>}</StyledNoItems> :
          <>
            {items.map((i) => {
              return (
                <StyledItemContainer key={i.id}>{i.name}
                  {edit &&
                  <div title={"Remove " + itemName}>
                    <RemoveSVG onClick={() => removeItemFromMainItem(Number(itemId), Number(i.id))}
                      style={{ width: "30px", height: "30px" }} />
                  </div>}
                </StyledItemContainer>
              );
            })}
          </>
        }
      </StyledItemsContainer>
    </>
  );

}