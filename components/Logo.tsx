import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/nielsc-logo.png"
      alt="Niel Supply Chain LLC"
      className={cn("h-10 w-auto sm:h-12", className)}
    />
  );
}
