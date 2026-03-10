// "use client"
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/header";
import Footer from './_components/footer'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import GlobalLoader from "@/components/global-loader";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    // const router = useRouter();

    // const { data: user, isLoading, isError } = useCurrentUser();

    // useEffect(() => {
    //     if (!isLoading && (isError || !user)) {
    //         router.replace("/login");
    //     }
    // }, [user, isLoading, isError, router]);

    // Page level loading state
    // if (isLoading) return <GlobalLoader msg="Authenticating..." />
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">

            <header className="flex items-center px-6 shrink-0 z-50 border-b border-border bg-card">
                <Navbar />
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:flex w-64 flex-col border-r border-border shrink-0 bg-card">
                    <Sidebar />
                </aside>

                <main className="flex-1 overflow-y-auto  transition-colors duration-300">

                    <div className="container mx-auto p-6 max-w-7xl min-h-full bg-muted/20  ">
                        {children}

                    </div>
                    <Footer />
                </main>

            </div>
        </div>
    );
}