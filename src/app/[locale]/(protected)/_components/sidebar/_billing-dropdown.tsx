// "use client"
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import type { SidebarTab } from "./sidebar-config";
// import { useTranslations } from "next-intl";
// import { TooltipContainer } from "@/components/tooltip-container";

// interface BillingDropdownProps {
//     tab: SidebarTab;
//     pathname: string;
//     collapsed?: boolean;
//     defaultOpen?: boolean;
// }

// export function BillingDropdown({ tab, pathname, collapsed, defaultOpen }: BillingDropdownProps) {
//     const t = useTranslations("sidebar");
//     const Icon = tab.icon;
//     const strippedPathname = pathname.replace(/^\/(en|hi|fr)/, "") || "/";
//     const isChildActive = tab.dropdown?.some(d => strippedPathname === d.href) ?? false;

//     const [open, setOpen] = useState(defaultOpen ?? isChildActive);

 
//     useEffect(() => {
//         if (defaultOpen) {
//             setOpen(true);
//         }
//     }, [defaultOpen]);
//     const btnClass = cn(
//         "w-full text-sm h-11 transition-all cursor-pointer",
//         collapsed ? "justify-center px-0" : "justify-start gap-3",
//         "text-foreground/80",
//         isChildActive
//             ? "text-primary font-semibold bg-accent/10 border-l-4 border-accent rounded-none"
//             : "hover:text-foreground hover:bg-muted border-l-4 border-transparent"
//     );

//     return (
//         <div>
//             {collapsed ? (
//                 <TooltipContainer title={t("Billing.title")} description="" side="right">
//                     <Button variant="ghost" className={btnClass} onClick={() => setOpen(o => !o)}>
//                         <Icon size={18} className={isChildActive ? "text-accent" : ""} />
//                     </Button>
//                 </TooltipContainer>
//             ) : (
//                 <Button variant="ghost" className={btnClass} onClick={() => setOpen(o => !o)}>
//                     <Icon size={18} className={isChildActive ? "text-accent" : ""} />
//                     <span className="flex-1 text-left">{t("Billing.title")}</span>
//                     <ChevronDown
//                         size={14}
//                         className={cn(
//                             "transition-transform duration-200",
//                             isChildActive ? "text-accent" : "text-muted-foreground",
//                             open && "rotate-180"
//                         )}
//                     />
//                 </Button>
//             )}

//             {/* Collapsed — child icons */}
//             {collapsed && open && (
//                 <div className="flex flex-col gap-1 mt-1 pl-1 border-l-1 border-border ml-3">
//                     {tab.dropdown?.map(item => {
//                         const ItemIcon = item.icon;
//                         const active = strippedPathname === item.href;
//                         return (
//                             <TooltipContainer key={item.key} title={t(`Billing.${item.key}`)} description="" side="right">
//                                 <Link href={item.href}>
//                                     <Button
//                                         variant="ghost"
//                                         className={cn(
//                                             "w-full h-9 justify-center px-0 transition-all cursor-pointer",
//                                             active
//                                                 ? "text-primary font-semibold bg-accent/10 border-l-2 border-accent rounded-none"
//                                                 : "hover:text-foreground hover:bg-muted"
//                                         )}
//                                     >
//                                         <ItemIcon size={13} className={active ? "text-accent" : ""} />
//                                     </Button>
//                                 </Link>
//                             </TooltipContainer>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Expanded — normal dropdown */}
//             {open && !collapsed && (
//                 <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-border pl-3">
//                     {tab.dropdown?.map(item => {
//                         const ItemIcon = item.icon;
//                         const active = strippedPathname === item.href;
//                         return (
//                             <Link key={item.key} href={item.href}>
//                                 <Button
//                                     variant="ghost"
//                                     className={cn(
//                                         "w-full justify-start gap-2.5 text-xs h-9 transition-all cursor-pointer text-foreground/70",
//                                         active
//                                             ? "text-primary font-semibold bg-accent/10 border-l-2 border-accent rounded-none"
//                                             : "hover:text-foreground hover:bg-muted"
//                                     )}
//                                 >
//                                     <ItemIcon size={14} className={active ? "text-accent" : ""} />
//                                     {t(`Billing.${item.key}`)}
//                                 </Button>
//                             </Link>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }