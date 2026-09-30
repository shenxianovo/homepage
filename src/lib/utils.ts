import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Keep custom radius utilities in the same conflict group as rounded-lg/full,
// so component defaults can still be overridden through className.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["panel", "frame", "control-xs", "control-sm"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
