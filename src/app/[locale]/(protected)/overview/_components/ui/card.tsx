// components/how-it-works-card.tsx
"use client"
import { cn } from "@/lib/utils"

interface Step {
    title: string
    description?: string
    badge?: {
        label: string
        className?: string
    }
}

interface CardProps {
    title?: string
    steps: Step[]
    className?: string
}

export function Card({
    title = "How it works?",
    steps,
    className
}: CardProps) {
    return (
        <div className={cn("bg-card border border-border rounded-2xl p-6 flex flex-col gap-5", className)}>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>

            <div className="flex flex-col gap-5">
                {steps.map((step, i) => (
                    <div key={i} className="flex gap-4">

                        {/* Number */}
                        <span className="text-sm font-bold text-primary w-4 shrink-0 mt-0.5">
                            {i + 1}
                        </span>

                        <div className="flex flex-col gap-1">

                            {/* Title */}
                            <p className="text-sm font-bold text-foreground">{step.title}</p>

                            {/* Description — optional */}
                            {step.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            )}

                            {/* Badge — optional */}
                            {step.badge && (
                                <span className={cn(
                                    "w-fit text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                                    step.badge.className ?? "bg-green-500/10 text-green-500 border-green-500/20"
                                )}>
                                    {step.badge.label}
                                </span>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}