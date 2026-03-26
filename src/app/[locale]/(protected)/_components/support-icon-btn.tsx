// // support-icon-btn.tsx
// import Link from "next/link";

// interface SupportIconBtnProps {
//     href: string;
//     icon: any;
//     label: string;
//     title: string;
// }

// export function SupportIconBtn({ href, icon: Icon, label, title }: SupportIconBtnProps) {
//     return (
//         <a
//             href={href}
//             target="_blank"
//             rel="noopener noreferrer"
//             title={title}
//             className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/10 transition-all group"
//         >
//             <Icon size={20} className="text-primary/80 group-hover:text-accent transition-colors" />
//             <span className="text-xs text-primary/80 group-hover:text-accent transition-colors">{label}</span>
//         </a>
//     );
// }
"use client"
import { type ComponentType } from "react";

interface SupportIconBtnProps {
    href?: string;
    onClick?: () => void;
    icon: ComponentType<{ size?: number; className?: string }>;
    label: string;
    title: string;
}

export function SupportIconBtn({ href, onClick, icon: Icon, label, title }: SupportIconBtnProps) {
    const className = "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/10 transition-all group cursor-pointer";
    const content = (
        <>
            <Icon size={20} className="text-primary/80 group-hover:text-accent transition-colors" />
            <span className="text-xs text-primary/80 group-hover:text-accent transition-colors">{label}</span>
        </>
    );

    if (onClick) {
        return (
            <button onClick={onClick} title={title} className={className}>
                {content}
            </button>
        );
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" title={title} className={className}>
            {content}
        </a>
    );
}