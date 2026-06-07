"use client";
import { useState } from "react";
import { SimulationOutput } from "@/types/simulation";
import ValuesForm from "@/components/ValuesForm";
import Projectile from "@/components/Projectile";

export default function Home() {
  const [result, setResult] = useState<SimulationOutput | null>(null);

  return (
    <main className="page-root">
      <header className="page-header">
        <div className="header-inner">
          <div className="logo-mark">
            <span className="logo-icon">⊛</span>
          </div>
          <div>
            <h1 className="page-title">Projectile Lab</h1>
            <p className="page-sub">
              Euler integration · Air resistance · Real-time trajectory
            </p>
          </div>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <ValuesForm setResult={setResult} />
        </aside>
        <section className="main-content">
          {result ? (
            <Projectile result={result} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">O</div>
              <p className="empty-title">Ready to simulate</p>
              <p className="empty-sub">Configure parameters and hit Launch</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
