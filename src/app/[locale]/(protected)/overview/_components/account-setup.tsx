"use client"
import { Check, Circle } from "lucide-react";

interface SetupStep {
    label: string;
    completed: boolean;
}

const SETUP_STEPS: SetupStep[] = [
    { label: "Activate your profile", completed: true },
    { label: "Complete your profile", completed: true },
    { label: "Complete your company information", completed: true },
    { label: "Create your first campaign", completed: false },
    { label: "Complete your billing information", completed: false },
    { label: "Add funds to your account", completed: false },
];
function AccountSetupCard() {
    const completed = SETUP_STEPS.filter(s => s.completed).length;
    const total = SETUP_STEPS.length;
    const progress = Math.round((completed / total) * 100);
    const remaining = total - completed;

    return (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
            <div>
                <h2 className="text-xl font-bold text-foreground">Account Setup</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Only {remaining} steps left and you are good to go
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {SETUP_STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                        {step.completed ? (
                            <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                <Check size={13} className="text-white" strokeWidth={3} />
                            </span>
                        ) : (
                            <Circle size={24} className="text-muted-foreground/40 shrink-0" />
                        )}
                        <span className={`text-sm ${step.completed ? "line-through text-muted-foreground/50" : "text-foreground"}`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AccountSetupCard;