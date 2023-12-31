import styled from "styled-components";
import { Stats } from "../types/Stats";
import Gauge from "./Gauge";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ThreeGaugesProps {
  stats: Stats;
}
/**
 *
 * @param stats
 * @returns Three Gauges Displaying our Stats
 */
const ThreeGauges = ({ stats }: ThreeGaugesProps) => {
  return (
    <Wrapper>
      <Gauge
        gaugeValue={stats.temperature}
        minValue={-280}
        maxValue={60}
        title={"Temperature (c)"}
        color={"#92000A"}
      />
      <Gauge
        gaugeValue={Number(stats.altitude / 1000)}
        minValue={-160}
        maxValue={160}
        title={"Altitude (km)"}
        color={"#77DD77"}
      />
      <Gauge
        gaugeValue={stats.velocity}
        minValue={-120}
        maxValue={120}
        title={"Velocity (km/h)"}
        color={"#E6E200"}
      />
    </Wrapper>
  );
};

export default ThreeGauges;
