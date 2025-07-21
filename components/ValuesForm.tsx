"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { env } from "@/lib/env";

const formSchema = z.object({
  g: z.number(),
  dragCoeff: z.number(),
  initial_velocity: z.number(),
  angleDegree: z.number(),
  deltaT: z.number(),
});

type formSchemaType = z.infer<typeof formSchema>;

type ValuesFormProps = {
  setGraphX: (x: number[]) => void;
  setGraphY: (y: number[]) => void;
};

const ValuesForm = ({ setGraphX, setGraphY }: ValuesFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      g: 9.8,
      dragCoeff: 0.01,
      initial_velocity: 50.0,
      angleDegree: 45.0,
      deltaT: 0.1,
    },
  });

  const onSubmit = async (data: formSchemaType) => {
    try {
      setLoading(true);
      //send data to java backend as post request
      const res = await axios.post(env.backendUrl, data);
      //get the resulting arrays

      //send coordinate arrays to the projectile graph
      console.log("RESPONSE_________");
      const { x, y } = res.data;

      setGraphX(x);
      setGraphY(y);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="g"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acceleration due to gravity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="angleDegree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Angle of launch (in degrees)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initial_velocity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Velocity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dragCoeff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drag Coefficient (for air resistance)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deltaT"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time gap for each calculation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loading ? <Loader2 className="animate-spin size-4 " /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ValuesForm;
