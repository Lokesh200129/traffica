
const GlobalLoader = ({ msg = "Loading..." }: { msg?: string }) => {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-6">

                {/* Animated logo mark */}
                <div className="relative w-16 h-16">
                    {/* Outer ring — slow spin */}
                    <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-spin"
                        style={{ animationDuration: "3s" }} />

                    {/* Middle ring — counter spin */}
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-accent/40 animate-spin"
                        style={{ animationDuration: "2s", animationDirection: "reverse" }} />

                    {/* Inner dot — pulse */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                    </div>
                </div>

                {/* Message */}
                <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-semibold text-foreground tracking-wide">{msg}</p>

                    {/* Animated dots */}
                    <div className="flex items-center gap-1">
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="w-1 h-1 rounded-full bg-accent/60 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GlobalLoader;