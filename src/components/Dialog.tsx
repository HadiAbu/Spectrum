import { Button } from "devextreme-react";
import { Popup } from "devextreme-react/popup";
import RocketStatus from "./RocketStatus";

import axios from "axios";
import styled from "styled-components";
import { ActOnSpectrumUrl } from "../constants/CONSTANTS";

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
/**
 * Our Dialog componenet to display the status of the rocket when action is required
 */
const Dialog = ({ open, onClose, isAscending, message }: DialogProps) => {
  const actionRequired = async () => {
    try {
      // Make a request to the ActOnSpectrum endpoint
      const response = await axios.get(ActOnSpectrumUrl);

      // no data is coming back from the API call, so we don't need to do anything
      console.log("ActOnSpectrum response:", response);
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
        <RocketStatus statusMessage={message} isAscending={isAscending} />
        <Button
          text="Act on Spectrum"
          type="success"
          stylingMode="contained"
          onClick={() => actionRequired()}
        />
      </DialogContent>
    </Popup>
  );
};

export default Dialog;
