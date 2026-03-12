"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { ProfileInfoTab } from "./profile-info-tab";
import { PasswordTab } from "./password-tab";
import { DeleteAccountTab } from "./delete-account-tab";

// ── Props — backend ready ─────────────────────────────────────────────────────
interface ProfilePageProps {
    // future: pass from useCurrentUser()
    userEmail?: string;
    userName?: string;
    // future: mutations
    onSaveProfile?: Parameters<typeof ProfileInfoTab>[0]["onSave"];
    onSavePassword?: Parameters<typeof PasswordTab>[0]["onSave"];
    onDeleteAccount?: Parameters<typeof DeleteAccountTab>[0]["onDeleteAccount"];
}

export default function ProfilePage({
    userEmail,
    userName,
    onSaveProfile,
    onSavePassword,
    onDeleteAccount,
}: ProfilePageProps) {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">My Profile</h1>
            </div>

            {/* Shadcn Tabs */}
            <Tabs defaultValue="info" >
                <TabsList className="mb-6 bg-accent/20 space-x-6">
                    <TabsTrigger value="info">Profile Information</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="delete">Delete Account</TabsTrigger>
                </TabsList>

                {/* Tab content card */}
                <div className="rounded-2xl border border-border bg-card p-6 ">
                    <TabsContent value="info">
                        <ProfileInfoTab
                            initialData={userEmail ? { email: userEmail, firstName: "", lastName: "" } : undefined}
                            onSave={onSaveProfile}
                        />
                    </TabsContent>

                    <TabsContent value="password">
                        <PasswordTab onSave={onSavePassword} />
                    </TabsContent>

                    <TabsContent value="delete">
                        <DeleteAccountTab
                            // userEmail={userEmail}
                            onDeleteAccount={onDeleteAccount}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
