"use client"
import AuthCard from "../components/auth-card";
import { useSignup } from "@/hooks/auth/use-signup";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/global-loader";

const SignupPage = () => {
    const router = useRouter();
    const { data: user, isLoading } = useCurrentUser();
    const isAuthenticated = !!user;
    const { mutate: signupAction, isPending } = useSignup();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, router]);
    if (isLoading || isPending) {
        return <GlobalLoader />;
    }
    return (
        <div className="flex justify-center items-center h-170">
            <AuthCard
                mode='signup'
                authAction={signupAction}
            />
        </div>
    );
};

export default SignupPage;