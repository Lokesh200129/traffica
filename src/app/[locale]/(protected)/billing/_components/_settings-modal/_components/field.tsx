
export function Field({ label, children }: { 
    label: string
    children: React.ReactNode 
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    )
}