"use client";
import AuthCard from "../components/auth-card";
import { useLogin } from "@/hooks/auth/use-login";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/global-loader";

const LoginPage = () => {
    const router = useRouter();
    const { data: user, isLoading } = useCurrentUser();
    const isAuthenticated = !!user;
    const { mutate: login, isPending } = useLogin();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || isPending) {
        return <GlobalLoader />;
    }
    return (
        <div className="flex justify-center items-center h-170 ">
            <AuthCard
                mode='login'
                authAction={login}
            />
        </div>
    );
};

export default LoginPage;