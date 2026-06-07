"use client";
import React, { useState, useMemo } from "react";
import { TrajectoryPoint } from "@/types/simulation";
type Props = { trajectory: TrajectoryPoint[] };
// Every Nth row to keep the table readable
function thin(arr: TrajectoryPoint[], maxRows: number): TrajectoryPoint[] {
  if (arr.length <= maxRows) return arr;
  const step = Math.ceil(arr.length / maxRows);
  const result = arr.filter((_, i) => i % step === 0);
  // Always include the last point
  if (result[result.length - 1] !== arr[arr.length - 1]) {
    result.push(arr[arr.length - 1]);
  }
  return result;
}
const COL_DEFS = [
  { key: "time", label: "Time", unit: "s", decimals: 3 },
  { key: "x", label: "x", unit: "m", decimals: 2 },
  { key: "y", label: "y", unit: "m", decimals: 2 },
  { key: "velocityX", label: "vx", unit: "m/s", decimals: 2 },
  { key: "velocityY", label: "vy", unit: "m/s", decimals: 2 },
  { key: "speed", label: "speed", unit: "m/s", decimals: 2 },
] as const;
export function TrajectoryTable({ trajectory }: Props) {
  const [maxRows, setMaxRows] = useState(50);
  const rows = useMemo(
    () =>
      thin(trajectory, maxRows).map((p) => ({
        ...p,
        speed: parseFloat(
          Math.sqrt(p.velocityX ** 2 + p.velocityY ** 2).toFixed(2),
        ),
      })),
    [trajectory, maxRows],
  );
  return (
    <div className="data-card">
      <div className="data-card-header">
        <span className="data-card-title">Trajectory data</span>
        <span className="data-badge">
          {trajectory.length} points · showing
          {rows.length}
        </span>
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {COL_DEFS.map((col) => (
                <th key={col.key}>
                  {col.label}
                  <span style={{ opacity: 0.5, marginLeft: 4 }}>
                    {col.unit}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {COL_DEFS.map((col) => (
                  <td key={col.key}>
                    {(row[col.key as keyof typeof row] as number).toFixed(
                      col.decimals,
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {trajectory.length > maxRows && (
        <div
          style={{
            padding: "10px 16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 8,
          }}
        >
          {[50, 100, 250].map((n) => (
            <button
              key={n}
              onClick={() => setMaxRows(n)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                border: "1px solid var(--border-md)",
                background: maxRows === n ? "var(--accent-dim)" : "var(--bg-2)",
                color: maxRows === n ? "var(--accent)" : "var(--text-3)",
                cursor: "pointer",
              }}
            >
              {n} rows
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
