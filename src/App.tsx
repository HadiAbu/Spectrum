import { useEffect, useState } from "react";

import RocketStatus from "./components/RocketStatus";
import Spinner from "./components/Spinner";
import Gauge from "./charts/Gauge";
import { Button } from "devextreme-react/button";

import { SpectrumStatusUrl } from "./constants/CONSTANTS";
import { Stats } from "./types/Stats";

import axios from "axios";
import styled from "styled-components";

import "./App.css";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
// first assignment, display stats
function App() {
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(SpectrumStatusUrl);
      const data = await resp.data;

      setStats(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Spectrum Stats</h1>
          {/* <WebSocketComponent /> */}
          {stats && (
            <>
              <RocketStatus
                statusMessage={stats.statusMessage}
                isActionRequired={stats.isActionRequired}
                isAscending={stats.isAscending}
              />
              <Wrapper>
                <Gauge
                  gaugeValue={stats.temperature}
                  minValue={-273.15}
                  maxValue={56.7}
                  title={"Temperature (c)"}
                  color={"#92000A"}
                />
                <Gauge
                  gaugeValue={stats.altitude}
                  minValue={-150}
                  maxValue={150}
                  title={"Altitude (km)"}
                  color={"#77DD77"}
                />
                <Gauge
                  gaugeValue={stats.velocity}
                  minValue={-100}
                  maxValue={100}
                  title={"Velocity (km/h)"}
                  color={"#E6E200"}
                />
              </Wrapper>
            </>
          )}
          <Button
            text="Fetch More Data"
            type="success"
            stylingMode="contained"
            onClick={fetchData}
          />
        </>
      )}
    </>
  );
}

export default App;
