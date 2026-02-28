"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from 'react-google-recaptcha';

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
    const title = isLogin ? "Welcome Back" : "Create Account";
    const description = isLogin ? "Log in to your account" : "Join our community today";
    const footerText = isLogin ? "Don't have an account?" : "Already have an account?"
    const footerLink = isLogin ? "/signup" : "/login"
    const footerLinkText = isLogin ? "Sign Up" : "Log In"

    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();


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
        <Card className="w-full md:w-1/2 lg:w-96 shadow-md mx-8">
            {/* React Hook Form wraps the submit here */}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl  text-accent">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {error && <p className="text-destructive text-sm text-center">{error}</p>}

                    {!isLogin && (
                        <Field>
                            <FieldLabel htmlFor="name">Name<span className="text-destructive">*</span></FieldLabel>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message as string}</p>}
                        </Field>
                    )}

                    <Field>
                        <FieldLabel htmlFor="email">Email<span className="text-destructive">*</span></FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@gmail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message as string}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Password<span className="text-destructive">*</span></FieldLabel>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                className="pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" }
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message as string}</p>}
                    </Field>

                    {/* CAPTCHA Container */}
                    <div className="flex flex-col items-center pt-2">
                        <input
                            type="hidden"
                            {...register("captcha", {
                                required: "Please complete the CAPTCHA",
                            })}
                        />
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            ref={recaptchaRef}
                            onChange={handleCaptchaChange}
                            onExpired={() => setValue("captcha", "", { shouldValidate: true })}
                        />
                        {errors.captcha && (
                            <p className="text-destructive text-xs mt-1">
                                {errors.captcha.message as string}
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-6">
                    <Button type="submit" className="w-full bg-accent cursor-pointer hover:bg-accent/90 text-accent-foreground font-semibold  px-6 h-10 " disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                    </Button>
                    <CardDescription>
                        {footerText} <Link href={footerLink} className="text-accent font-medium cursor-pointer ">{footerLinkText}</Link>
                    </CardDescription>
                </CardFooter>
            </form>
        </Card>
    );
}