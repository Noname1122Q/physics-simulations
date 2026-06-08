"use client";

import { SimulationOutput } from "@/types/simulation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    g: z.string(),
    dragCoeff: z.string(),
    initial_velocity: z.string(),
    angleDegree: z.string(),
    deltaT: z.string(),
  })
  .superRefine((values, ctx) => {
    const parsed: Partial<Record<keyof typeof values, number>> = {};

    for (const key of Object.keys(values) as (keyof typeof values)[]) {
      const num = parseFloat(values[key]);
      if (values[key].trim() === "" || isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: [key],
        });
      } else {
        parsed[key] = num;
      }
    }

    if (parsed.g !== undefined && parsed.g <= 0)
      ctx.addIssue({ code: "custom", message: "Must be > 0", path: ["g"] });
    if (parsed.initial_velocity !== undefined && parsed.initial_velocity <= 0)
      ctx.addIssue({
        code: "custom",
        message: "Must be > 0",
        path: ["initial_velocity"],
      });
    if (
      parsed.angleDegree !== undefined &&
      (parsed.angleDegree < 0 || parsed.angleDegree > 90)
    )
      ctx.addIssue({
        code: "custom",
        message: "Must be 0 – 90",
        path: ["angleDegree"],
      });
    if (
      parsed.deltaT !== undefined &&
      (parsed.deltaT < 0.0001 || parsed.deltaT > 1)
    )
      ctx.addIssue({
        code: "custom",
        message: "Must be 0.0001 – 1",
        path: ["deltaT"],
      });
    if (parsed.dragCoeff !== undefined && parsed.dragCoeff < 0)
      ctx.addIssue({
        code: "custom",
        message: "Must be ≥ 0",
        path: ["dragCoeff"],
      });
  });

type RawFormType = z.infer<typeof formSchema>;

const PRESETS: Record<string, Partial<RawFormType>> = {
  Earth: {
    g: "9.8",
    dragCoeff: "0.01",
    initial_velocity: "50",
    angleDegree: "45",
    deltaT: "0.1",
  },
  Moon: {
    g: "1.62",
    dragCoeff: "0",
    initial_velocity: "50",
    angleDegree: "45",
    deltaT: "0.1",
  },
  Mars: {
    g: "3.72",
    dragCoeff: "0.005",
    initial_velocity: "50",
    angleDegree: "45",
    deltaT: "0.1",
  },
  Vacuum: {
    g: "9.8",
    dragCoeff: "0",
    initial_velocity: "50",
    angleDegree: "45",
    deltaT: "0.1",
  },
};

type FieldMeta = {
  name: keyof RawFormType;
  label: string;
  hint: string;
  unit: string;
};
const FIELDS: FieldMeta[] = [
  {
    name: "g",
    label: "Gravity",
    hint: "Acceleration due to gravity",
    unit: "m/s²",
  },
  {
    name: "initial_velocity",
    label: "Initial velocity",
    hint: "Launch speed",
    unit: "m/s",
  },
  {
    name: "angleDegree",
    label: "Launch angle",
    hint: "Degrees above horizontal (0-90)",
    unit: "°",
  },
  {
    name: "dragCoeff",
    label: "Drag coefficient",
    hint: "Air resistance factor (0 = none)",
    unit: "",
  },
  {
    name: "deltaT",
    label: "Δt",
    hint: "Time step for Euler integration",
    unit: "s",
  },
];

type ValuesFormProps = {
  setResult: (r: SimulationOutput) => void;
};

const ValuesForm = ({ setResult }: ValuesFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RawFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: PRESETS["Earth"] as RawFormType,
    mode: "onSubmit",
  });

  const values = watch();
  const applyPreset = (key: string) => {
    const preset = PRESETS[key];
    for (const [k, v] of Object.entries(preset)) {
      setValue(k as keyof RawFormType, v as string, { shouldValidate: false });
    }
  };
  const onSubmit = async (raw: RawFormType) => {
    const payload = {
      g: parseFloat(raw.g),
      dragCoeff: parseFloat(raw.dragCoeff),
      initial_velocity: parseFloat(raw.initial_velocity),
      angleDegree: parseFloat(raw.angleDegree),
      deltaT: parseFloat(raw.deltaT),
    };
    try {
      setLoading(true);
      const res = await axios.post<SimulationOutput>("/api/simulate", payload);
      console.log("_________RES____________");
      console.log(res.data);
      setResult(res.data);
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Presets */}
      <p className="form-section-label">Quick presets</p>
      <div className="preset-row">
        {Object.keys(PRESETS).map((label) => (
          <button
            key={label}
            type="button"
            className="preset-chip"
            onClick={() => applyPreset(label)}
            disabled={loading}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Fields */}
      <p className="form-section-label">Parameters</p>
      {FIELDS.map(({ name, label, hint, unit }) => {
        const err = errors[name];
        return (
          <div className="field-row" key={name}>
            <div className="field-top">
              <label className="field-label" htmlFor={name}>
                {label}
              </label>
              {values[name] && (
                <span className="field-value">
                  {values[name]}
                  {unit && (
                    <span style={{ opacity: 0.6, marginLeft: 2 }}>{unit}</span>
                  )}
                </span>
              )}
            </div>
            <input
              id={name}
              type="text"
              inputMode="decimal"
              className={`field-input${err ? " error" : ""}`}
              disabled={loading}
              {...register(name)}
            />
            {err ? (
              <p className="field-error">{err.message}</p>
            ) : (
              <p className="field-hint">{hint}</p>
            )}
          </div>
        );
      })}
      {/* Submit */}
      <button type="submit" className="launch-btn" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Simulating…
          </>
        ) : (
          "Launch simulation"
        )}
      </button>
      <div className="warn">
        <p>
          * The initial simulation may take a little longer because the server
          needs to start up. Once the server is running, subsequent simulations
          should complete much faster.
        </p>
      </div>
    </form>
  );
};
export default ValuesForm;
