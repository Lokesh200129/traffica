"use client"
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Camera, Trash2, Plus } from "lucide-react";

import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useUpdateUser } from "@/hooks/auth/use-update-user";
import Image from "next/image";
import DefaultAvatar from "@/assets/avatar.png";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileInfoTab() {
    const { data: currentUser } = useCurrentUser();
    const { mutateAsync: updateUser } = useUpdateUser();
    const [saved, setSaved] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: "", email: "" },
    });

    useEffect(() => {
        if (currentUser) {
            form.reset({ name: currentUser.name ?? "", email: currentUser.email ?? "" });
            setProfileImage(currentUser.profileImage ?? null);
        }
    }, [currentUser]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setProfileImageFile(file); setProfileImage(URL.createObjectURL(file)); }
        e.target.value = "";
    };

    const handleRemove = () => { setProfileImage(null); setProfileImageFile(null); };

    const isChanged = form.formState.isDirty || profileImageFile !== null ||
        (profileImage === null && !!currentUser?.profileImage);

    const onSubmit = async (values: ProfileFormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        if (profileImageFile) formData.append("profileImage", profileImageFile);
        if (profileImage === null && currentUser?.profileImage) formData.append("removeImage", "true");

        await updateUser(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const hasPhoto = !!profileImage;

    return (
        <div className="flex flex-col gap-6">

            {/* Top: Profile Image + Name/Email */}
            <div className="flex items-center gap-5">
                <div className="relative group shrink-0">
                    <div className="relative w-20 h-20 rounded-full border-2 border-border bg-muted overflow-hidden">
                        {hasPhoto ? (
                            <Image src={profileImage!} alt="Profile" fill className="object-cover" sizes="80px" />
                        ) : (
                            <Image src={DefaultAvatar} alt="Default" fill className="object-cover" sizes="80px" />
                        )}
                    </div>

                    {/* <div className="absolute left-[37%] -bottom-2 border-2 border-primary rounded-full  flex items-center justify-center p-1  gap-2">
                        {hasPhoto ? (
                            <>
                                <button type="button" onClick={() => inputRef.current?.click()}
                                    className="text-accent" title="Change photo">
                                    <Camera size={14} />
                                </button>
                                <button type="button" onClick={handleRemove}
                                    className="text-accent " title="Remove photo">
                                    <Trash2 size={14} />
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => inputRef.current?.click()}
                                className="text-accent " title="Add photo">
                                <Plus size={16} />
                            </button>
                        )}
                    </div> */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-background border border-border rounded-full p-1 shadow-md">
                        {hasPhoto ? (
                            <>
                                <button type="button" onClick={() => inputRef.current?.click()}
                                    className="p-1 rounded-full text-blue-400 cursor-pointer hover:bg-blue-400/10 transition-colors" title="Change photo">
                                    <Camera size={13} />
                                </button>
                                <div className="w-px h-3 bg-border" />
                                <button type="button" onClick={handleRemove}
                                    className="p-1 rounded-full text-red-400 cursor-pointer hover:bg-red-400/10 transition-colors" title="Remove photo">
                                    <Trash2 size={13} />
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => inputRef.current?.click()}
                                className="p-1 rounded-full text-accent cursor-pointer hover:bg-accent/10 transition-colors" title="Add photo">
                                <Plus size={14} />
                            </button>
                        )}
                    </div>

                    <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </div>

                <div className="flex flex-col gap-0.5">
                    <p className="text-lg font-semibold text-foreground">{currentUser?.name ?? "—"}</p>
                    <p className="text-sm text-muted-foreground">{currentUser?.email ?? "—"}</p>
                </div>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            disabled
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <AppButton
                        title={saved ? "Saved" : "Save Changes"}
                        icon={saved ? Check : undefined}
                        type="submit"
                        isLoading={form.formState.isSubmitting}
                        disabled={!isChanged}
                        className="w-fit self-end"

                    />

                </form>
            </Form>
        </div>
    );
}