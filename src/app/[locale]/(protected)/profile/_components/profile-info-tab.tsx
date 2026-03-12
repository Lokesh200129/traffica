"use client"
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Camera, Trash2, User } from "lucide-react";
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
import type { ProfileInfo } from "../_types/types";
import { MOCK_PROFILE } from "../_types/types";

// ── Schema ────────────────────────────────────────────────────────────────────
const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ── Avatar uploader ───────────────────────────────────────────────────────────
function AvatarUploader({
    avatar,
    onUpload,
    onRemove,
}: {
    avatar: string | null;
    onUpload: (file: File) => void;
    onRemove: () => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
        e.target.value = "";
    };

    return (
        <div className="flex items-center gap-5 mb-2">
            {/* Circle */}
            <div className="relative group shrink-0">
                <div className="w-20 h-20 rounded-full border-2 border-border bg-muted flex items-center justify-center overflow-hidden">
                    {avatar
                        ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                        : <User size={32} className="text-muted-foreground" />
                    }
                </div>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Camera size={18} className="text-white" />
                </button>
                <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
                <AppButton
                    title={avatar ? "Change Photo" : "Upload Photo"}
                    icon={Camera}
                    iconSize={13}
                    size="sm"
                    variant="outline"
                    className="bg-background text-foreground hover:text-accent hover:border-accent border-border"
                    onClick={() => inputRef.current?.click()}
                    type="button"
                />
                {avatar && (
                    <AppButton
                        title="Remove"
                        icon={Trash2}
                        iconSize={13}
                        size="sm"
                        variant="outline"
                        className="bg-background text-muted-foreground hover:text-red-500 hover:border-red-500/30 border-border"
                        onClick={onRemove}
                        type="button"
                    />
                )}
                <p className="text-[10px] text-muted-foreground">JPG, PNG or GIF · Max 2MB</p>
            </div>
        </div>
    );
}

// ── Props — backend ready ─────────────────────────────────────────────────────
interface ProfileInfoTabProps {
    initialData?: ProfileInfo;
    onSave?: (data: ProfileFormValues & { avatar?: File | null }) => Promise<void>;
}

export function ProfileInfoTab({
    initialData = MOCK_PROFILE,
    onSave,
}: ProfileInfoTabProps) {
    const [avatar, setAvatar] = useState<string | null>(initialData?.avatarUrl ?? null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [saved, setSaved] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: initialData.firstName,
            lastName: initialData.lastName,
        },
    });

    const onSubmit = async (values: ProfileFormValues) => {
        await onSave?.({ ...values, avatar: avatarFile });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <AvatarUploader
                    avatar={avatar}
                    onUpload={(file) => { setAvatarFile(file); setAvatar(URL.createObjectURL(file)); }}
                    onRemove={() => { setAvatar(null); setAvatarFile(null); }}
                />

                {/* Email — readonly */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input value={initialData.email} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl><Input placeholder="John" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <AppButton
                        title={saved ? "Saved" : form.formState.isSubmitting ? "Saving..." : "Save Changes"}
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