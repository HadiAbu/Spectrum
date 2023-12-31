import { useState, useEffect, useRef } from "react";

import Dialog from "./components/Dialog";
import Spinner from "./components/Spinner";
import Line from "./charts/Line";
import { Button } from "devextreme-react";

import styled from "styled-components";
import { WebSocketUrl } from "./constants/CONSTANTS";
import { Stats } from "./types/Stats";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Second assignment, open a websocket and display live data
 */
const App2 = () => {
  const [velocity, setVelocity] = useState<number[]>([]);
  const [altitude, setAltitude] = useState<number[]>([]);
  const [temperature, setTemperature] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [isAscending, setIsAscending] = useState(false);
  const [isActionRequired, setIsActionRequired] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [socket, setWebSocket] = useState(new WebSocket(WebSocketUrl));

  useEffect(() => {
    // let socket: WebSocket;
    const connectWebSocket = () => {
      //   socket = new WebSocket(WebSocketUrl);

      // Define the WebSocket endpoint URL
      // Event listener for when the connection is opened
      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened:", event);
      });

      // Event listener for when a message is received from the server
      socket.addEventListener("message", async (event) => {
        try {
          // Check if the component is not paused before processing the message
          if (!isPaused) {
            console.log("Received message:", event.data);
            setLoading(true);
            // Parse the received data
            const data = JSON.parse(event.data);

            setVelocity((prev) => [...prev, data.Velocity]);
            setTemperature((prev) => [...prev, data.Temperature]);
            setAltitude((prev) => [...prev, data.Altitude]);
            setIsActionRequired(() => data.IsActionRequired);
            setIsAscending(() => data.IsAscending);
            setStatusMessage(() => data.StatusMessage);

            if (data.IsActionRequired) {
              togglePause();
              setOpenDialog(true);
            }
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      });

      // Event listener for errors
      socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
        socket.close();
        setTimeout(() => {
          setWebSocket(new WebSocket(WebSocketUrl));
        }, 1000);
      });

      // Event listener for when the connection is closed
      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event);
        setTimeout(() => {
          setWebSocket(new WebSocket(WebSocketUrl));
        }, 1000);
      });
    };
    connectWebSocket();

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      console.log("Closing WebSocket connection");
      socket.close();
    };
  }, [isPaused, socket]);

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
    setWebSocket(new WebSocket(WebSocketUrl));
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    togglePause();
  };

  const checkMeasures =
    velocity &&
    velocity.length != 0 &&
    altitude &&
    altitude.length != 0 &&
    temperature &&
    temperature.length != 0;

  const stats: Stats = {
    velocity: velocity[velocity.length - 1],
    altitude: altitude[altitude.length - 1],
    temperature: temperature[temperature.length - 1],
    statusMessage: statusMessage,
    isAscending: isAscending,
  };

  if (loading) return <Spinner />;

  return (
    <>
      <h1>Spectrum Live Data</h1>
      {checkMeasures ? (
        <>
          <Wrapper>
            <Line dataset={velocity} title="Velocity (km/h)" color="Pastel" />
            <Line dataset={temperature} title="Temperature (c)" color="Ocean" />
            <Line dataset={altitude} title="Altitude (km)" color="Soft" />
          </Wrapper>
          <Button
            onClick={() => togglePause()}
            type={isPaused ? "success" : "danger"}
          >
            {isPaused
              ? "Continue receiving updates"
              : "Stop receiving live updates"}
          </Button>
        </>
      ) : null}

      {openDialog && (
        <Dialog open={openDialog} onClose={onCloseDialog} stats={stats} />
      )}
    </>
  );
};

export default App2;
