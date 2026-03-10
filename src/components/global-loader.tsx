const GlobalLoader = ({ msg = "Loading..." }: { msg?: string }) => {
    return (
        <div className="fixed inset-0 left-0 top-0 z-999 flex flex-col items-center justify-center bg-card/60 backdrop-blur-sm h-screen max-w-full">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium">{msg}</p>
            </div>
        </div>
    );
};

export default GlobalLoader