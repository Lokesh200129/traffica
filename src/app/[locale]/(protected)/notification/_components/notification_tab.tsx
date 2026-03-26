import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Bell, Megaphone, CreditCard, Gift, AlertCircle } from "lucide-react";

// Different icon types for different notifications
type NotificationType = "default" | "campaign" | "billing" | "reward" | "alert"

interface NotificationItemProps {
    title: string;
    description: string;
    timestamp: Date | string;
    isRead?: boolean;
    type?: NotificationType;
    className?: string;
    onClick?: () => void;
}

const TYPE_CONFIG: Record<NotificationType, {
    icon: React.ElementType
    iconClass: string
    bgClass: string
}> = {
    default:  { icon: Bell,         iconClass: "text-accent",       bgClass: "bg-accent/10" },
    campaign: { icon: Megaphone,    iconClass: "text-blue-500",     bgClass: "bg-blue-500/10" },
    billing:  { icon: CreditCard,   iconClass: "text-green-500",    bgClass: "bg-green-500/10" },
    reward:   { icon: Gift,         iconClass: "text-purple-500",   bgClass: "bg-purple-500/10" },
    alert:    { icon: AlertCircle,  iconClass: "text-yellow-500",   bgClass: "bg-yellow-500/10" },
}

export default function NotificationItem({
    title,
    description,
    timestamp,
    isRead = false,
    type = "default",
    className,
    onClick,
}: NotificationItemProps) {
    const { icon: Icon, iconClass, bgClass } = TYPE_CONFIG[type]

    const timeAgo = typeof timestamp === "string"
        ? timestamp
        : formatDistanceToNow(new Date(timestamp), { addSuffix: true })

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer",
                "hover:bg-muted/60 active:scale-[0.99]",
                !isRead && "bg-accent/5",
                className
            )}
        >
            {/* Left border indicator */}
            {!isRead && (
                <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-accent" />
            )}

            {/* Icon */}
            <div className={cn(
                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                bgClass
            )}>
                <Icon size={16} className={iconClass} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-0.5 overflow-hidden min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h4 className={cn(
                        "text-sm font-semibold leading-snug truncate",
                        isRead ? "text-foreground/60" : "text-foreground"
                    )}>
                        {title}
                    </h4>

                    {/* Unread dot */}
                    {!isRead && (
                        <span className="mt-1.5 shrink-0 h-2 w-2 rounded-full bg-accent" />
                    )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <span className="text-[10px] text-muted-foreground/60 mt-1">
                    {timeAgo}
                </span>
            </div>
        </div>
    )
}