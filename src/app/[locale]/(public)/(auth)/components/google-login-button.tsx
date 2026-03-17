"use client"
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/auth/use-google-auth";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
interface GoogleLoginButtonProps {
    mode: "login" | "signup";
}

export default function GoogleLoginButton({ mode }: GoogleLoginButtonProps) {
    const { mutate: googleAuth, isPending } = useGoogleAuth();

    const login = useGoogleLogin({
        onSuccess: (response) => googleAuth(response.access_token),
        onError: () => toast.error("Google login failed"),
    });

    return (
        <button
            type="button"
            onClick={() => login()}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-border bg-background hover:bg-muted transition-colors text-sm font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending
                ? <Loader2 size={18} className="animate-spin" />
                : <FcGoogle size={20} />
            }
            {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
        </button>
    );
}