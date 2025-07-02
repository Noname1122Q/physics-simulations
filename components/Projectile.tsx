import React from "react";
import { ProjectileChart } from "./ProjectileChart";

const sample_data = [
  { 0: 0 },
  { 1: 1 },
  { 2: 2 },
  { 3: 3 },
  { 4: 4 },
  { 5: 4 },
  { 6: 3 },
  { 7: 2 },
  { 8: 1 },
  { 9: 0 },
];

const Projectile = () => {
  return (
    <div className="w-screen h-screen">
      <ProjectileChart />
    </div>
  );
};

export default Projectile;
