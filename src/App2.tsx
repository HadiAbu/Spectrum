import { useState, useEffect } from "react";

import Dialog from "./components/Dialog";
import Spinner from "./components/Spinner";
import ThreeLinesChart from "./charts/ThreeLinesChart";
import { Button } from "devextreme-react";

import { WebSocketUrl } from "./constants/CONSTANTS";
import { Stats } from "./types/Stats";

/**
 * Second assignment, open a websocket and display live data
 */
const App2 = () => {
  let timeout: number | undefined;
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
    const connectWebSocket = () => {
      // Define the WebSocket endpoint URL
      // Event listener for when the connection is opened
      socket.addEventListener("open", () => {});

      // Event listener for when a message is received from the server
      socket.addEventListener("message", async (event) => {
        try {
          // Check if the component is not paused before processing the message
          if (!isPaused) {
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
      socket.addEventListener("error", () => {
        socket.close();
        resetTimeout();
      });

      // Event listener for when the connection is closed
      socket.addEventListener("close", () => {
        resetTimeout();
      });
    };
    connectWebSocket();

    // Cleanup function to close the WebSocket connection and timeout event when the component unmounts
    return () => {
      socket.close();
      clearTimeout(timeout);
    };
  }, [isPaused, socket]);

  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
    setWebSocket(new WebSocket(WebSocketUrl));
  };
  const resetTimeout = () => {
    timeout = setTimeout(() => {
      setWebSocket(new WebSocket(WebSocketUrl));
    }, 1000);
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
      {checkMeasures && (
        <>
          <ThreeLinesChart
            velocity={velocity}
            altitude={altitude}
            temperature={temperature}
          />
          <Button
            onClick={() => togglePause()}
            type={isPaused ? "success" : "danger"}
          >
            {isPaused
              ? "Continue receiving updates"
              : "Stop receiving live updates"}
          </Button>
        </>
      )}
      {openDialog && (
        <Dialog open={openDialog} onClose={onCloseDialog} stats={stats} />
      )}
    </>
  );
};

export default App2;
