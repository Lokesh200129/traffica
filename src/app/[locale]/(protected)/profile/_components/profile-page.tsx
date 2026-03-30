
"use client"
import {
    Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { ProfileInfoTab } from "./profile-info-tab";
import { PasswordTab } from "./password-tab";
import { DeleteAccountTab } from "./delete-account-tab";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { cn } from "@/lib/utils";

const tabTriggerClass = cn(
    "px-4 py-2 rounded-xl transition-all cursor-pointer",
    "text-foreground/60 hover:text-foreground ",
    "data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
);
export default function ProfilePage() {
    const { data: currentUser } = useCurrentUser();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">My Profile</h1>
            </div>
            {/* tabs */}
            <Tabs defaultValue="info">

                <TabsList className="mb-6 space-x-6 text-primary bg-transparent h-auto p-0 inline-flex rounded-2xl border border-accent/20  p-1 gap-1">
                    <TabsTrigger value="info" className={tabTriggerClass}>
                        Profile Information
                    </TabsTrigger>

                    {currentUser?.authProvider !== 'google' && (
                        <TabsTrigger value="password" className={tabTriggerClass}>
                            Password
                        </TabsTrigger>
                    )}

                    <TabsTrigger value="delete" className={cn(tabTriggerClass)}>
                        Delete Account
                    </TabsTrigger>
                </TabsList>
                
                {/* tabs content */}
                <div className="rounded-2xl border border-border bg-card p-6">
                    <TabsContent value="info">
                        <ProfileInfoTab />
                    </TabsContent>

                    <TabsContent value="password">
                        <PasswordTab />
                    </TabsContent>

                    <TabsContent value="delete">
                        <DeleteAccountTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}