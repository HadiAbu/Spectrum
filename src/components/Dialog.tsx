import { Button } from "devextreme-react";
import { Popup } from "devextreme-react/popup";
import RocketStatus from "./RocketStatus";
import ThreeGauges from "../charts/ThreeGauges";

import axios from "axios";
import styled from "styled-components";

import { ActOnSpectrumUrl } from "../constants/CONSTANTS";
import { Stats } from "../types/Stats";

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
  stats: Stats;
}
/**
 * Our Dialog componenet to display the status of the rocket when action is required
 */
const Dialog = ({ open, onClose, stats }: DialogProps) => {
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
      width={920}
      height={600}
    >
      <DialogContent>
        <RocketStatus
          statusMessage={stats.statusMessage}
          isAscending={stats.isAscending}
        />
        <ThreeGauges stats={stats} />
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
