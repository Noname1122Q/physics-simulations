"use client";
import Projectile from "@/components/Projectile";
import ValuesForm from "@/components/ValuesForm";
import { useState } from "react";

export default function Home() {
  const [graphX, setGraphX] = useState<number[]>([]);
  const [graphY, setGraphY] = useState<number[]>([]);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center bg-slate-300">
      <ValuesForm setGraphX={setGraphX} setGraphY={setGraphY} />
      <Projectile graphX={graphX} graphY={graphY} />
    </div>
  );
}
