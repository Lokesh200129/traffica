import { AppButton } from "@/components/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 space-y-6">

            {/* Big 404 */}
            <h1 className="text-[120px] font-black leading-none text-accent/50 select-none">
                404
            </h1>

            {/* Message */}
            <h2 className="text-2xl font-bold text-foreground mt-2">
                Page not found
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
                Looks like this page took a wrong turn. Let's get you back on track.
            </p>
            <AppButton title=" Back to Overview" href="/overview" size="lg" />
            {/* Back button
                <Link
                    href="/overview"
                    className= inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors"
                >

                </Link> */}
        </div>
    );
}