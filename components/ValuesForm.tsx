"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

const baseSchema = z.object({
  g: z.string(),
  dragCoeff: z.string(),
  initial_velocity: z.string(),
  angleDegree: z.string(),
  deltaT: z.string(),
});

const formSchema = baseSchema.superRefine((values, ctx) => {
  const parsed: Partial<Record<keyof typeof values, number>> = {};

  for (const key of Object.keys(values) as (keyof typeof values)[]) {
    const val = values[key];
    const num = parseFloat(val);
    if (val.trim() === "" || isNaN(num)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${key} is required`,
        path: [key],
      });
    } else {
      parsed[key] = num;
    }
  }

  // custom range checks
  if (parsed.g !== undefined && parsed.g <= 0) {
    ctx.addIssue({
      code: "custom",
      message: "Gravity must be > 0",
      path: ["g"],
    });
  }

  if (parsed.initial_velocity !== undefined && parsed.initial_velocity <= 0) {
    ctx.addIssue({
      code: "custom",
      message: "Velocity must be > 0",
      path: ["initial_velocity"],
    });
  }

  if (
    parsed.angleDegree !== undefined &&
    (parsed.angleDegree < 0 || parsed.angleDegree > 90)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Angle must be between 0 and 90",
      path: ["angleDegree"],
    });
  }

  if (
    parsed.deltaT !== undefined &&
    (parsed.deltaT < 0.0001 || parsed.deltaT > 1)
  ) {
    ctx.addIssue({
      code: "custom",
      message: "Delta T must be between 0.0001 and 1",
      path: ["deltaT"],
    });
  }

  if (parsed.dragCoeff !== undefined && parsed.dragCoeff < 0) {
    ctx.addIssue({
      code: "custom",
      message: "Drag must be ≥ 0",
      path: ["dragCoeff"],
    });
  }
});

type RawFormType = z.infer<typeof baseSchema>;

type ValuesFormProps = {
  setGraphX: (x: number[]) => void;
  setGraphY: (y: number[]) => void;
};

const ValuesForm = ({ setGraphX, setGraphY }: ValuesFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<RawFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      g: "9.8",
      dragCoeff: "0.01",
      initial_velocity: "50.0",
      angleDegree: "45.0",
      deltaT: "0.1",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (rawData: RawFormType) => {
    const data = {
      g: parseFloat(rawData.g),
      dragCoeff: parseFloat(rawData.dragCoeff),
      initial_velocity: parseFloat(rawData.initial_velocity),
      angleDegree: parseFloat(rawData.angleDegree),
      deltaT: parseFloat(rawData.deltaT),
    };

    try {
      setLoading(true);
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL!, data);
      const { x, y } = res.data;
      setGraphX(x);
      setGraphY(y);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (name: keyof RawFormType, label: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 md:space-y-4"
      >
        {renderField("g", "Acceleration due to gravity")}
        {renderField("angleDegree", "Angle of launch (in degrees)")}
        {renderField("initial_velocity", "Initial Velocity")}
        {renderField("dragCoeff", "Drag Coefficient (for air resistance)")}
        {renderField("deltaT", "Time gap for each calculation")}

        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin size-4 mr-2" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ValuesForm;
