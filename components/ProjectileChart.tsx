"use client";

import { LineChart } from "@mui/x-charts/LineChart";

export function ProjectileChart({ x, y }: { x: number[]; y: number[] }) {
  return (
    <LineChart
      xAxis={[{ data: x }]}
      series={[
        {
          data: y,
          showMark: false,
          disableHighlight: true,
          label: undefined,
        },
      ]}
      height={300}
    />
  );
}
