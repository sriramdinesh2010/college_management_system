import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["M.sc", "B.sc", "PhD"] }]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [0, 1, 2] }]}
    />
  );
}
