import {
  Chart,
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Margin,
  Title,
  Tooltip,
  Grid,
  Series,
} from "devextreme-react/chart";

type Palette = "Soft" | "Pastel" | "Ocean";
interface LineChartProps {
  dataset: number[] | undefined;
  title: string;
  color: Palette;
}

const Line = ({ dataset, title, color }: LineChartProps) => {
  if (dataset == null || !Array.isArray(dataset)) return null;

  //perparing the axis for the dataset
  const newDataset = dataset.map((x, i) => {
    return { x1: i, y1: x };
  });

  return (
    <Chart palette={color} dataSource={newDataset}>
      <CommonSeriesSettings type={"line"} />
      <Series name={title} argumentField="x1" valueField="y1" />
      <Margin bottom={20} />
      <ArgumentAxis
        valueMarginsEnabled={false}
        discreteAxisDivisionMode="crossLabels"
      >
        <Grid visible={true} />
      </ArgumentAxis>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="bottom"
      />
      <Title text={title}>
        {/* <Subtitle text="(Velocity, Altitude, temperature)" /> */}
      </Title>
      <Tooltip enabled={true} />
    </Chart>
  );
};

export default Line;
