
"use client"
import { useState } from "react"
import { X, Zap, CreditCard, Trash2, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppButton } from "@/components/button"
import { useBalanceModal } from "@/store/balance-modal"
import { useCreatePaymentOrder } from "@/hooks/payment/use-create-payment-order"
import GlobalLoader from "@/components/global-loader"

const QUICK_AMOUNTS = [
    { amount: 10, credits: "10,000", label: "Starter", popular: false },
    { amount: 25, credits: "25,000", label: "Growth", popular: false },
    { amount: 50, credits: "50,000", label: "Pro", popular: true },
    { amount: 100, credits: "100,000", label: "Scale", popular: false },
    { amount: 250, credits: "250,000", label: "Business", popular: false },
    { amount: 500, credits: "500,000", label: "Enterprise", popular: false },
]

const CREDITS_PER_DOLLAR = 1000
const minimumAmount = 10

export default function BalanceInput() {
    const { toggle, isOpen } = useBalanceModal()
    const [amount, setAmount] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState(false)

    const { mutate: createOrder, isPending } = useCreatePaymentOrder();

    const numericAmount = parseFloat(amount) || 0
    const estimatedCredits = Math.floor(numericAmount * CREDITS_PER_DOLLAR)
    const isLoading = isPending || isProcessing

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9.]/g, '')
        if (/^\d*\.?\d{0,2}$/.test(val)) setAmount(val)
    }

    const handlePayment = () => {
        if (numericAmount >= minimumAmount && !isLoading) {
            setIsProcessing(true)
            createOrder(numericAmount, {
                onSettled: () => setIsProcessing(false),
            });
        }
    }

    const handleClose = () => {
        toggle()
        setAmount("")
    }

    if (!isOpen) return null;

    if (isPending) return GlobalLoader({ msg: "Creating payment order..." })
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={toggle}
        >
            <div
                className="relative w-full max-w-[420px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

                <div className="p-5 flex flex-col gap-5">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-accent/10 flex items-center justify-center">
                                <Zap size={16} className="text-accent" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold leading-none">Add Credits</h2>
                                <p className="text-[11px] text-primary mt-0.5">$1 = 100 credits</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40"
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Amount Input */}
                    <div className="flex flex-col gap-2">
                        <div className="relative group">
                            {/* Dollar sign */}
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground group-focus-within:text-accent transition-colors pointer-events-none">
                                $
                            </span>

                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0.00"
                                autoFocus
                                disabled={isLoading}
                                value={amount}
                                onChange={handleInput}
                                className="w-full h-14 pl-9 pr-10 text-2xl font-black rounded-xl border-2 border-input bg-background focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none disabled:opacity-50 tabular-nums"
                            />

                            {/* Clear button */}
                            {amount && !isLoading && (
                                <button
                                    onClick={() => setAmount("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>

                        {/* Credits preview */}
                        <div className="flex justify-between items-center px-0.5">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                                You receive
                            </span>
                            <span className={cn(
                                "text-xs font-bold transition-colors flex items-center gap-1",
                                estimatedCredits > 0 ? "text-accent" : "text-muted-foreground/50"
                            )}>
                                {estimatedCredits > 0 && <Sparkles size={10} />}
                                {estimatedCredits.toLocaleString()} credits
                            </span>
                        </div>
                    </div>

                    {/* Quick Select Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {QUICK_AMOUNTS.map(q => (
                            <button
                                key={q.amount}
                                disabled={isLoading}
                                onClick={() => setAmount(q.amount.toString())}
                                className={cn(
                                    "relative flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-xl border transition-all duration-150 disabled:opacity-40",
                                    amount === q.amount.toString()
                                        ? "border-accent bg-accent/8 ring-2 ring-accent/15"
                                        : "border-border hover:border-accent/30 hover:bg-accent/5"
                                )}
                            >
                                {q.popular && (
                                    <span className="absolute -top-2 px-1.5 py-px rounded-full text-[8px] font-black bg-accent text-white uppercase tracking-tight">
                                        Popular
                                    </span>
                                )}
                                <span className={cn(
                                    "text-sm font-bold",
                                    amount === q.amount.toString() ? "text-accent" : "text-foreground"
                                )}>
                                    ${q.amount}
                                </span>
                                <span className="text-[9px] text-muted-foreground leading-none">
                                    {q.credits} cr
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col gap-3">
                        <AppButton
                            title={
                                isLoading
                                    ? "Processing payment..."
                                    : numericAmount >= minimumAmount
                                        ? `Pay $${numericAmount.toFixed(2)}`
                                        : numericAmount > 0
                                            ? `Minimum $${minimumAmount}`
                                            : "Select an amount"
                            }
                            icon={isLoading ? Loader2 : CreditCard}
                            size="lg"
                            fullWidth
                            disabled={numericAmount < minimumAmount || isLoading}
                            onClick={handlePayment}
                            className={cn(
                                "h-12 text-sm font-semibold",
                                isLoading && "opacity-80 cursor-not-allowed"
                            )}
                        />

                        <p className="text-center text-[10px] text-muted-foreground leading-relaxed px-4">
                            Secured by{" "}
                            <span className="font-semibold text-foreground">Cashfree Payments</span>
                            {" "}· Encrypted · No data stored
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}