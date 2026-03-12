"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/button";

// ── Schema ────────────────────────────────────────────────────────────────────
const passwordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

// ── Password input with show/hide ─────────────────────────────────────────────
function PasswordInput({ field }: { field: any }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <Input type={show ? "text" : "password"} placeholder="••••••••" className="pr-10" {...field} />
            <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
        </div>
    );
}

// ── Props — backend ready ─────────────────────────────────────────────────────
interface PasswordTabProps {
    onSave?: (data: { newPassword: string }) => Promise<void>;
}

export function PasswordTab({ onSave }: PasswordTabProps) {
    const [saved, setSaved] = useState(false);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const onSubmit = async (values: PasswordFormValues) => {
        await onSave?.({ newPassword: values.newPassword });
        form.reset();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl><PasswordInput field={field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-type New Password</FormLabel>
                            <FormControl><PasswordInput field={field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <AppButton
                        title={saved ? "Password Updated" : form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                        icon={saved ? Check : undefined}
                        type="submit"
                        isLoading={form.formState.isSubmitting}
                        className={cn(saved && "bg-green-500 hover:bg-green-500/90")}
                    />
                </div>

            </form>
        </Form>
    );
}