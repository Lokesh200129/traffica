import { create } from 'zustand';

interface BillingStore {
    isOpen: boolean;
    toggle: () => void;
}

export const useBalanceModal = create<BillingStore>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));