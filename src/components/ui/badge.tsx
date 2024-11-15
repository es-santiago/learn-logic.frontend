import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        FIEL: "border-transparent bg-emerald-500 text-emerald-100 shadow",
        ESPORADICO: "border-transparent bg-slate-500 text-slate-100",
        VISITANTE: "border-transparent bg-neutral-500 text-neutral-100",
        ATIVO: "border-transparent bg-emerald-500 text-emerald-100 shadow",
        INATIVO: "border-transparent bg-neutral-500 text-neutral-100",
        TESTE_COLOR: "border-transparent bg-[#CD6243] text-white shadow",
        TESTE_COLOR_2: "border-transparent bg-[#7367f0] text-white shadow"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
