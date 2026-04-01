import { apiSuccess, apiError } from "@/lib/api-response";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import { comparePassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { tryCatchWrapper } from "@/lib/try-catch";

export const POST = tryCatchWrapper(async (req: Request) => {
    const { email, password, captchaToken } = await req.json();

    if (!captchaToken) {
        return apiError("CAPTCHA token is missing", 400);
    }

    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const captchaRes = await fetch(googleVerifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
        return apiError("Invalid CAPTCHA. Please try again.", 400);
    }

    const user = await User.findOne({ email });
    if (!user) return apiError("Invalid Credentials", 401);
    if (user.role !== "client") {
        return apiError("Only clients can log in here", 403);
    }
    // Google user password se login karne ki koshish kare
    if (user.authProvider === "google") {
        return apiError("This account uses Google Sign-In. Please login with Google.", 401);
    }

    if (!user.password) {
        return apiError("Invalid Credentials", 401);
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) return apiError("Invalid Credentials", 401);

    const token = await signToken({ userId: user._id.toString(), email: user.email, role: user.role });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    });

    const userData = user.toObject();
    delete userData.password;

    return apiSuccess(userData, "User logged in successfully", 200);
});