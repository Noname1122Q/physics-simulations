export type TrajectoryPoint = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  time: number;
};

export type SimulationOutput = {
  trajectory: TrajectoryPoint[];
  maxHeight: number;
  range: number;
  flightTime: number;
  impactVelocity: number;
};

export type SimulationInput = {
  g: number;
  dragCoeff: number;
  initial_velocity: number;
  angleDegree: number;
  deltaT: number;
};
