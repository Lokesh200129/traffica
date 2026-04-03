
import Sidebar from "./sidebar/sidebar";
import Navbar from "./header";
import Footer from './footer'
import HelpWidget from "./help/help-widget";
import MobileBottomBar from "../_components/mobile-view/bottom-bar";
import MobileHeaderWithSidebar from "./mobile-view/mobile-sidebar";
// import { useState } from "react";
 
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    // const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">

            <Navbar />
            <MobileHeaderWithSidebar
            // onToggleSidebar={() => setSidebarOpen(o => !o)}
            // isSidebarOpen={sidebarOpen}
            />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar — desktop only */}
                <aside className="hidden md:flex max-w-64 flex-col border-r border-border shrink-0 bg-card">
                    <Sidebar />
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto transition-colors duration-300 bg-muted/20">
                    <div className="container mx-auto p-6 max-w-7xl min-h-full">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>

            {/* Mobile bottom bar */}
            <MobileBottomBar />

            <HelpWidget />
        </div>
    );
}