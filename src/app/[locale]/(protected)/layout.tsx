import Main from "./_components/main"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <Main>
            {children}
        </Main>
    )
}