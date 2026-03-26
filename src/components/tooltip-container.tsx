import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipContainerProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    /** Side the tooltip appears on */
    side?: "top" | "right" | "bottom" | "left";
    /** Custom trigger element; defaults to a HelpCircle icon */
    triggerClassName?: string;
}

export function TooltipContainer({
    title,
    description,
    children,
    side = "top",
    triggerClassName,
}: TooltipContainerProps) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children ?? (
                        <button
                            type="button"
                            className={cn(
                                "inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                triggerClassName
                            )}
                        >
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">{title}</span>
                        </button>
                    )}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    className="max-w-55 rounded-xl border bg-popover px-3 py-2 shadow-lg"
                >
                    <p className="text-[13px] font-semibold text-popover-foreground">
                        {title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
                        {description}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}