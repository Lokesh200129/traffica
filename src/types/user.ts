export type TUser = {
    _id?: string,
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    profileImage?: string
    authProvider?: "local" | "google";
    creditBalance?: {
        availableCredits?: number,
        lastAdded?: number,
        lastUpdatedAt?: Date
    }
}
