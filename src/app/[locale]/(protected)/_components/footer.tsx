
export default function DashboardFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="container flex h-16 flex-wrap items-center justify-between px-4">
                <p className="text-sm text-muted-foreground">
                    © Traffic Arbitrage.AI {new Date().getFullYear()}
                </p>

            </div>
        </footer>
    );
}
