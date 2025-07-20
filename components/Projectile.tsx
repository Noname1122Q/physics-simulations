import React from "react";
import { ProjectileChart } from "./ProjectileChart";

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const y = [0, 1, 2, 3, 4, 4.5, 4, 3, 2, 1, 0];

const Projectile = () => {
  return (
    <div className=" max-w-lg  w-full h-full flex items-center justify-center">
      <ProjectileChart x={x} y={y} />
    </div>
  );
};

export default Projectile;
