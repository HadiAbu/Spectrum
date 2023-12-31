import styled from "styled-components";
import Line from "./Line";

interface ThreeLinesChartProps {
  velocity: number[];
  temperature: number[];
  altitude: number[];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * @param velocity
 * @param temperature
 * @param altitude
 * @returns a React component with 3 Line charts displaying velocity, temperature, altitude
 */
const ThreeLinesChart = ({
  velocity,
  temperature,
  altitude,
}: ThreeLinesChartProps) => {
  return (
    <Wrapper>
      <Line dataset={velocity} title="Velocity (km/h)" color="Pastel" />
      <Line dataset={temperature} title="Temperature (c)" color="Ocean" />
      <Line dataset={altitude} title="Altitude (km)" color="Soft" />
    </Wrapper>
  );
};

export default ThreeLinesChart;
