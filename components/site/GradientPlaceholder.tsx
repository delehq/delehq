import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-black via-black to-red",
  "from-red via-black to-black",
  "from-black to-black/70",
  "from-red/80 via-black to-black",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function GradientPlaceholder({
  seed,
  label,
  className,
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const gradient = GRADIENTS[hashString(seed) % GRADIENTS.length];

  return (
    <div
      className={cn(
        "flex h-full w-full items-end bg-gradient-to-br p-6",
        gradient,
        className,
      )}
    >
      {label && (
        <span className="text-[14px] font-medium uppercase tracking-wide text-cream/70">
          {label}
        </span>
      )}
    </div>
  );
}
