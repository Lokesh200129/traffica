"use client";
import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CampaignSuccessDialogProps {
    open: boolean;
    onClose: () => void;
}

export function CampaignSuccessDialog({ open, onClose }: CampaignSuccessDialogProps) {
    const [countdown, setCountdown] = useState(12);

    useEffect(() => {
        if (!open) {
            setCountdown(12);
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm flex flex-col items-center text-center gap-4 p-8">

                {/* Lottie Animation */}
                <DotLottieReact
                    src="/animations/success.json"
                    autoplay
                    loop={false}
                    style={{ width: 180, height: 180, color: "#d97757" }}
                />

                {/* Text */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-accent flex items-center justify-center gap-2">
                        Congratulations ! <PartyPopper color="#d97757" />
                    </h2>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                        Your campaign has been created successfully.<br />
                        Traffic may take up to 12 hours to begin. During this time, visitors are evaluated based on demographics, intent, and interests before being forwarded to your site.
                    </p>
                </div>

                {/* Countdown */}
                <p className="text-xs text-muted-foreground">
                    Automatically Closing in {countdown}s
                </p>

            </DialogContent>
        </Dialog>
    );
}