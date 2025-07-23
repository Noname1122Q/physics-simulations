import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function HowItWorks() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="hover:cursor-pointer hover:scale-105 hover:opacity-80 transition-all"
          variant="ghost"
        >
          How It Works?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How it works?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            💡 How It Works
          </h3>

          <p>
            This tool simulates the motion of a projectile launched from the
            ground by calculating its trajectory using physics laws.
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>
              You provide values like <strong>initial velocity</strong>,{" "}
              <strong>angle of launch</strong>, <strong>gravity</strong>,{" "}
              <strong>air resistance</strong>, and <strong>time step</strong>.
            </li>
            <li>
              The backend uses <strong>Newton&apos;s laws</strong> and{" "}
              <strong>Euler&apos;s method</strong> to calculate the position of
              the projectile at each moment in time.
            </li>
            <li>Calculations continue until the projectile hits the ground.</li>
            <li>
              The resulting <strong>X</strong> and <strong>Y</strong>{" "}
              coordinates are plotted on a graph to visualize the full
              trajectory.
            </li>
          </ul>

          <p>
            The simulation accounts for <strong>air resistance</strong>, so you
            can compare realistic motion with ideal physics by adjusting the
            drag coefficient.
          </p>

          <p className="text-gray-500 italic">
            Tip: Try setting the drag coefficient to 0 to see the perfect
            parabolic arc!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
