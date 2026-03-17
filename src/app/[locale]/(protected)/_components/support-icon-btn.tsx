// support-icon-btn.tsx
import Link from "next/link";

interface SupportIconBtnProps {
    href: string;
    icon: any;
    label: string;
    title: string;
}

export function SupportIconBtn({ href, icon: Icon, label, title }: SupportIconBtnProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/10 transition-all group"
        >
            <Icon size={20} className="text-primary/80 group-hover:text-accent transition-colors" />
            <span className="text-xs text-primary/80 group-hover:text-accent transition-colors">{label}</span>
        </a>
    );
}