"use client"
import { AppButton } from "@/components/button";

// ── Props — backend ready ─────────────────────────────────────────────────────
interface DeleteAccountTabProps {
    onDeleteAccount?: () => Promise<void>;
}

export function DeleteAccountTab({ onDeleteAccount }: DeleteAccountTabProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 text-sm text-foreground leading-relaxed">
                {/* <p>
                    Please cancel all the subscriptions before removing the account. We will not be
                    able to cancel or refund any payments once the information has been deleted.{" "}
                    <br />
                    You can cancel the subscriptions in the{" "}
                    <a href="/billing/settings" className="text-accent hover:underline">
                        Billing→Subscriptions
                    </a>{" "}
                    page.
                </p> */}
                <p>
                    Removing an account is a permanent and non-reversible action. We will not be
                    able to restore your data.
                </p>
                <p>
                    However, your projects' hashed information is stored securely without any
                    personal data, so if you intend to close the account just for the sake of
                    getting more free traffic, it will not work, and you will not be able to create
                    new free projects for the same websites.
                </p>
            </div>

            <div>
                <AppButton
                    title="Delete Account"
                    onClick={onDeleteAccount}
                />
            </div>
        </div>
    );
}