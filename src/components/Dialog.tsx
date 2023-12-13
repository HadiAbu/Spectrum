import { Button } from "devextreme-react";
import { Popup } from "devextreme-react/popup";
import { ActOnSpectrumUrl } from "../constants/CONSTANTS";
import axios from "axios";
import styled from "styled-components";
import RocketStatus from "./RocketStatus";

const DialogContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface DialogProps {
  open: boolean;
  onClose: () => void;
  isAscending: boolean | undefined;
  message: string | undefined;
}

const Dialog = ({ open, onClose, isAscending, message }: DialogProps) => {
  const actionRequired = async () => {
    try {
      // Make a request to the ActOnSpectrum endpoint
      const response = await axios.get(ActOnSpectrumUrl);

      // Handle the response as needed
      const responseData = response;
      console.log("ActOnSpectrum response:", responseData);
      onClose();
    } catch (error) {
      console.error("Error in ActOnSpectrum:", error);
    }
  };
  return (
    <Popup
      visible={open}
      dragEnabled={false}
      hideOnOutsideClick={true}
      onVisibleChange={onClose}
      showCloseButton={true}
      showTitle={true}
      title="Action Required!"
      width={350}
      height={300}
    >
      <DialogContent>
        <RocketStatus
          statusMessage={message}
          // isActionRequired={liveData?.IsActionRequired}
          isAscending={isAscending}
        />
        <Button
          text="Act on Spectrum"
          type="success"
          stylingMode="contained"
          onClick={() => actionRequired()}
        />
      </DialogContent>
      {/* <Position at="center" my="center" collision="fit" /> */}
    </Popup>
  );
};

export default Dialog;
