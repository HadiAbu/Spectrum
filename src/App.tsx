import { useEffect, useState } from "react";

import RocketStatus from "./components/RocketStatus";
import Spinner from "./components/Spinner";
import ThreeGauges from "./charts/ThreeGauges";
import { Button } from "devextreme-react/button";

import { SpectrumStatusUrl } from "./constants/CONSTANTS";
import { Stats } from "./types/Stats";

import axios from "axios";
import "./App.css";

/**
 * first assignment, display data coming from API
 */
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
          {stats && (
            <>
              <RocketStatus
                statusMessage={stats.statusMessage}
                isActionRequired={stats.isActionRequired}
                isAscending={stats.isAscending}
              />
              <ThreeGauges stats={stats} />
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
