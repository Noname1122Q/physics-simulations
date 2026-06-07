"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrajectoryPoint } from "@/types/simulation";

type Props = { trajectory: TrajectoryPoint[] };

function sample<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr;

  const step = Math.ceil(arr.length / max);

  return arr.filter((_, i) => i % step === 0 || i === arr.length - 1);
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload as TrajectoryPoint;

  return (
    <div
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--border-md)",
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-2)",
        lineHeight: 1.7,
      }}
    >
      <p style={{ color: "var(--accent)", marginBottom: 4, fontWeight: 500 }}>
        t = {d.time.toFixed(2)}s
      </p>
      <p>x &nbsp;= {d.x.toFixed(2)} m</p>
      <p>y &nbsp;= {d.y.toFixed(2)} m</p>
      <p>vx = {d.velocityX.toFixed(2)} m/s</p>
      <p>vy = {d.velocityY.toFixed(2)} m/s</p>
    </div>
  );
};

export function ProjectileChart({ trajectory }: Props) {
  const data = sample(trajectory, 300);
  const maxY = Math.max(...trajectory.map((p) => p.y));
  return (
    <div className="chart-card">
      <div className="chart-header">
        <span className="chart-title">Trajectory</span>
        <div className="chart-legend">
          <div className="legend-item">
            <div
              className="legend-dash"
              style={{ background: "var(--accent)" }}
            />
            Height vs distance
          </div>
        </div>
      </div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trajGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8ff47" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#e8ff47" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{
                fill: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              label={{
                value: "Distance (m)",
                position: "insideBottomRight",
                offset: -8,
                fill: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={[0, Math.ceil(maxY * 1.12)]}
              tick={{
                fill: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              label={{
                value: "Height (m)",
                angle: -90,
                position: "insideLeft",
                offset: 12,
                fill: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
              }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={maxY}
              stroke="rgba(232,255,71,0.25)"
              strokeDasharray="4 4"
              label={{
                value: `Peak ${maxY.toFixed(1)}m`,
                fill: "var(--text-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                position: "right",
              }}
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke="#e8ff47"
              strokeWidth={2}
              fill="url(#trajGrad)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#e8ff47",
                stroke: "var(--bg)",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
