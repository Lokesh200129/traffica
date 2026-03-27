// components/charts/custom-tooltip.tsx
import React from "react"

interface TooltipItem {
    name: string
    icon?: React.ElementType
    color?: string
}

interface CustomTooltipProps {
    active?: boolean
    payload?: any[]
    items?: TooltipItem[]        // icon + name match karne ke liye
    label?: string               // optional header
    valueSuffix?: string         // "views", "clicks" etc — default "views"
    formatter?: (_value: number) => string  // custom value format
}

export function CustomTooltip({
    active,
    payload,
    items,
    label,
    valueSuffix = "views",
    formatter,
}: CustomTooltipProps) {
    if (!active || !payload?.length) return null

    const value = payload[0].value
    const name = payload[0].payload?.name

    // items prop se matching item dhundo (optional)
    const matchedItem = items?.find(i => i.name === name)

    const displayValue = formatter
        ? formatter(value)
        : `${value.toLocaleString()} ${valueSuffix}`

    return (
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">

            {/* Color dot — agar icon nahi hai */}
            {matchedItem?.color && !matchedItem?.icon && (
                <span className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: matchedItem.color }} />
            )}

            {/* Icon — agar hai toh */}
            {matchedItem?.icon && (
                <matchedItem.icon size={15} className="text-foreground/80 shrink-0" />
            )}

            {/* Name */}
            {name && (
                <span className="text-sm font-medium text-foreground/80">{name}</span>
            )}

            {/* Label override */}
            {label && !name && (
                <span className="text-sm font-medium text-foreground/80">{label}</span>
            )}

            {/* Value */}
            <span className="text-sm text-foreground">{displayValue}</span>

        </div>
    )
}