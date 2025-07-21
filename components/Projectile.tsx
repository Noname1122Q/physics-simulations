import React from "react";
import { ProjectileChart } from "./ProjectileChart";

type ProjectileProps = {
  graphX: number[];
  graphY: number[];
};

const Projectile = ({ graphX, graphY }: ProjectileProps) => {
  return (
    <div className=" max-w-lg  w-full h-full flex items-center justify-center">
      <ProjectileChart x={graphX} y={graphY} />
    </div>
  );
};

export default Projectile;
