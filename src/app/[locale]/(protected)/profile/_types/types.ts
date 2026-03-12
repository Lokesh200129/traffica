// ── Profile Types ─────────────────────────────────────────────────────────────
export interface ProfileInfo {
    email:     string;   // readonly — cannot be changed
    firstName: string;
    lastName:  string;
}

export interface PasswordForm {
    currentPassword: string;
    newPassword:     string;
    confirmPassword: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
export const MOCK_PROFILE: ProfileInfo = {
    email:     "lokeshpal210310@gmail.com",
    firstName: "",
    lastName:  "",
};
