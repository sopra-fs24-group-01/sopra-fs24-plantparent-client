import { PlantFull } from "../../types";
import React, { useState } from "react";
import { getQRCodeURL } from "../../service/qrService";
import { StyledPrimaryButton } from "./Login";
import styled from "styled-components";
import { saveAs } from "file-saver";

const StyledQRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 150px;
`;


const StyledQrCode = styled.img`
  width: 150px;
  height: 150px;

`;

export const StyledSecondaryButton = styled(StyledPrimaryButton)`
  width: 150px;
  font-size: 1rem;
  margin: auto;
`;


export function QRCodeComponent({ plant }: { plant: PlantFull }) {
  const [qrCodeURL, setQRCodeURL] = useState<string>("");
  const [showButton, setShowButton] = useState<boolean>(true);
  const url = window.location.origin;

  function generateQRCode() {
    const qrUrl = getQRCodeURL({ url: url + "/plant/" + plant.plantId, size: [150, 150] });
    setQRCodeURL(qrUrl);
    setShowButton(false);
  }

  async function downloadImage() {
    try {
      const filename = plant.plantName + ".png"
      const response = await fetch(qrCodeURL);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (e) {
      console.log("Error downloading image: ", e);
    }
  }

  return (
    <StyledQRCodeContainer>
      {showButton && <StyledSecondaryButton disabled={false} onClick={() => generateQRCode()}>Generate QR
        code</StyledSecondaryButton>}
      {qrCodeURL &&
        <>
          <StyledQrCode src={qrCodeURL} alt="QR code" />
          <StyledSecondaryButton onClick={() => downloadImage()}>Download</StyledSecondaryButton>
        </>
      }
    </StyledQRCodeContainer>
  );
}