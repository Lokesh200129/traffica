"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon, Loader2 } from "lucide-react";
// import { Slot } from "@radix-ui/react-slot"; // Shadcn internally isse use karta hai
// import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    href?: string;
    icon?: LucideIcon;
    iconSize?: number;
    isLoading?: boolean;
    fullWidth?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
    (
        {
            title,
            href,
            icon: Icon,
            iconSize = 18,
            isLoading = false,
            fullWidth = false,
            className = "",
            variant = "default",
            size = "default",
            disabled,

            ...props
        },
        ref
    ) => {
      
        const buttonContent = (
            <>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />
                ) : (
                    Icon && <Icon size={iconSize} className="mr-1 shrink-0" />
                )}
                <span className="">{title}</span>
            </>
        );

        const combinedClasses = cn(
            "transition-all active:scale-[0.98] cursor-pointer font-medium inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white border-none rounded-xl",
            fullWidth && "w-full",
            className
        );

        if (href) {
            return (
                <Button
                    asChild
                    variant={variant}
                    size={size}
                    className={combinedClasses}
                    disabled={isLoading || disabled}
                >
                    <Link href={href}>
                        {buttonContent}
                    </Link>
                </Button>
            );
        }

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={combinedClasses}
                disabled={isLoading || disabled}
                {...props}
            >
                {buttonContent}
            </Button>
        );
    }
);

AppButton.displayName = "AppButton";

export { AppButton };