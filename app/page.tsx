"use client";
import Projectile from "@/components/Projectile";
import ValuesForm from "@/components/ValuesForm";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center bg-slate-300">
      <ValuesForm />
      <Projectile />
    </div>
  );
}
