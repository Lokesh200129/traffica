"use client"
import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { FAQ_COLLECTIONS, type HelpCollection } from "../types/help-widget-types";
import { FAQAccordion } from "../faq-accordion";
import { Input } from "@/components/ui/input";

// ── Single collection view ────────────────────────────────────────────────────
function CollectionView({
    collection,
    onBack,
}: {
    collection: HelpCollection;
    onBack: () => void;
}) {
    const [search, setSearch] = useState("");
    const filtered = collection.articles.filter(a =>
        a.question.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-border">
                <button
                    onClick={onBack}
                    className="text-xs text-accent hover:underline mb-2 flex items-center gap-1"
                >
                    <ChevronRight size={12} className="rotate-180" /> Back
                </button>
                <h3 className="font-bold text-foreground">{collection.title}</h3>
                <p className="text-xs text-muted-foreground">{collection.articles.length} articles</p>
            </div>
            <div className="px-4 py-2 border-b border-border">
                <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search articles…"
                        className="pl-8"
                    />
                </div>

            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
                {filtered.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No results found</p>
                ) : (
                    filtered.map(item => <FAQAccordion key={item.id} item={item} />)
                )}
            </div>
        </div>
    );
}

// ── Help tab — collections list + global search ───────────────────────────────
export function HelpTab() {
    const [search, setSearch] = useState("");
    const [activeCol, setActiveCol] = useState<HelpCollection | null>(null);

    if (activeCol) {
        return <CollectionView collection={activeCol} onBack={() => setActiveCol(null)} />;
    }

    const filtered = FAQ_COLLECTIONS.map(col => ({
        ...col,
        articles: col.articles.filter(a =>
            a.question.toLowerCase().includes(search.toLowerCase()) ||
            a.answer.toLowerCase().includes(search.toLowerCase())
        ),
    })).filter(col => col.articles.length > 0);

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-6 pb-1">
                <h3 className="font-bold text-foreground">Help Center</h3>
                <p className="text-xs text-muted-foreground">Browse articles or search for answers</p>
            </div>
            <div className="px-4 py-6 border-b border-border">
                <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for help…"
                        className="pl-8"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {search ? (
                    <div className="px-4 py-3">
                        {filtered.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                No results for "{search}"
                            </p>
                        ) : (
                            filtered.map(col => (
                                <div key={col.id} className="mb-4">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                        {col.title}
                                    </p>
                                    {col.articles.map(item => (
                                        <FAQAccordion key={item.id} item={item} />
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            {FAQ_COLLECTIONS.length} collections
                        </p>
                        {FAQ_COLLECTIONS.map(col => (
                            <button
                                key={col.id}
                                onClick={() => setActiveCol(col)}
                                className="w-full flex items-center justify-between py-4 border-b border-border last:border-0 hover:opacity-70 transition-opacity text-left"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{col.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{col.articles.length} articles</p>
                                </div>
                                <ChevronRight size={15} className="text-muted-foreground shrink-0" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}