import CircularGauge, {
  Font,
  Margin,
  Range,
  RangeContainer,
  Scale,
  Title,
  Tooltip,
} from "devextreme-react/circular-gauge";
import styled from "styled-components";

interface GaugeProps {
  gaugeValue: number;
  minValue: number;
  maxValue: number;
  title: string;
  color: string;
}
const Wrapper = styled.div`
  // width: 250px;
`;
const Gauge = ({
  gaugeValue,
  minValue,
  maxValue,
  title,
  color,
}: GaugeProps) => {
  const result = title + " " + Number(gaugeValue).toFixed(2);
  return (
    <Wrapper>
      <CircularGauge value={gaugeValue} containerBackgroundColor="red">
        <Margin top={10} bottom={10} left={30} right={45} />
        <Scale startValue={minValue} endValue={maxValue}></Scale>
        <RangeContainer>
          <Range startValue={minValue} endValue={maxValue} color={color} />
        </RangeContainer>
        <Tooltip enabled={true} />
        <Title text={result} verticalAlignment="top">
          <Font size={28} color="black" />
        </Title>
      </CircularGauge>
    </Wrapper>
  );
};

export default Gauge;
