"use client";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultAvatar from "@/assets/avatar.png";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

const ProfileIcon = ({ className }: { className?: string }) => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className={cn("h-9 w-9 rounded-full border border-border flex items-center justify-center bg-muted", className)}>
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
        );
    }
    const profileSrc = user?.profileImage ? user.profileImage : DefaultAvatar;

    return (
        <div
            className={cn(
                "relative h-9 w-9 rounded-full border border-border overflow-hidden cursor-pointer hover:opacity-80 transition-all bg-accent/10 flex items-center justify-center ",
                className
            )}
        >
            <Image
                src={profileSrc}
                alt={user?.name || "User Profile"}
                fill
                className="object-cover "
                sizes="36px"
            />
        </div>
    );
};

export default ProfileIcon;