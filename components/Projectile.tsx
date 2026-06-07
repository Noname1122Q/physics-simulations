import { SimulationOutput } from "@/types/simulation";
import { ProjectileChart } from "./ProjectileChart";
import { TrajectoryTable } from "./TrajectoryTable";

type ProjectileProps = {
  result: SimulationOutput;
};

const Projectile = ({ result }: ProjectileProps) => {
  const { trajectory, maxHeight, range, flightTime, impactVelocity } = result;

  const stats = [
    {
      label: "Max range",
      value: range.toFixed(1),
      unit: "m",
      highlight: true,
    },
    {
      label: "Max height",
      value: maxHeight.toFixed(1),
      unit: "m",
      highlight: false,
    },
    {
      label: "Flight time",
      value: flightTime.toFixed(2),
      unit: "s",
      highlight: false,
    },
    {
      label: "Initial velocity",
      value: range.toFixed(1),
      unit: "m/s",
      highlight: false,
    },
  ];

  return (
    <div
      className="result-root"
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <div className="stats-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`stat-card${s.highlight ? "highlight" : ""}`}
          >
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">
              {s.value}
              <span className="stat-unit">{s.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <ProjectileChart trajectory={trajectory} />

      <TrajectoryTable trajectory={trajectory} />
    </div>
  );
};

export default Projectile;
