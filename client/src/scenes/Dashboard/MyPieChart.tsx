import { PieChart } from "@mui/x-charts/PieChart";

type Props = {
  malecount: number;
  femalecount: number;
};

export default function MyPieChart({ malecount, femalecount }: Props) {
  const data = [
    { value: malecount, label: "Male Student" },
    { value: femalecount, label: "Female Student" },
  ];
  return (
    <PieChart
      series={[
        {
          arcLabelMinAngle: 45,
          data,
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
        },
      ]}
    />
  );
}
