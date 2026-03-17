"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleLoginButton from './google-login-button';

interface authProp {
    mode: 'login' | 'signup';
    authAction: any;
    loading?: boolean;
    error?: string;
}

export default function AuthCard({ mode, authAction, loading, error }: authProp) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const isLogin = mode === 'login';

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleCaptchaChange = (token: string | null) => {
        setValue("captcha", token ?? "", { shouldValidate: true });
    };

    const onFormSubmit = async (data: any) => {
        const token = recaptchaRef.current?.getValue();
        if (!token) {
            alert("Please complete the CAPTCHA");
            return;
        }
        const result = await authAction({ ...data, captchaToken: token });
        if (result) {
            router.push("/");
        } else {
            recaptchaRef.current?.reset();
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto bg-card border border-border rounded-2xl shadow-xl p-8 flex flex-col gap-6">

            {/* Header */}
            <div className="text-center flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-accent">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {isLogin ? "Log in to your account" : "Join our community today"}
                </p>
            </div>

            {/* Google button — top pe */}
            <GoogleLoginButton mode={mode} />

            {/* Divider */}
            <div className="flex items-center gap-3">
                <hr className="flex-1 border-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <hr className="flex-1 border-border" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">

                {error && (
                    <p className="text-destructive text-sm text-center bg-destructive/10 py-2 px-3 rounded-lg">
                        {error}
                    </p>
                )}

                {!isLogin && (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground">
                            Name <span className="text-destructive">*</span>
                        </label>
                        <input
                            placeholder="John Doe"
                            className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-destructive text-xs">{errors.name.message as string}</p>}
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                        Email <span className="text-destructive">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="name@gmail.com"
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message as string}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                        Password <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full h-11 px-4 pr-11 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" }
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-destructive text-xs">{errors.password.message as string}</p>}
                </div>

                {/* CAPTCHA */}
                <div className="flex flex-col items-center">
                    <input
                        type="hidden"
                        {...register("captcha", { required: "Please complete the CAPTCHA" })}
                    />
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        ref={recaptchaRef}
                        onChange={handleCaptchaChange}
                        onExpired={() => setValue("captcha", "", { shouldValidate: true })}
                    />
                    {errors.captcha && (
                        <p className="text-destructive text-xs mt-1">{errors.captcha.message as string}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
                </button>

            </form>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link
                    href={isLogin ? "/signup" : "/login"}
                    className="text-accent font-medium hover:underline"
                >
                    {isLogin ? "Sign Up" : "Log In"}
                </Link>
            </p>
        </div>
    );
}