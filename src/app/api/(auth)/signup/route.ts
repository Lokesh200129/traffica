import User from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { ApiResponse } from "@/lib/api-response";
import { tryCatchWrapper } from "@/lib/api-handler";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import slugify from 'slugify';

export const POST = tryCatchWrapper(async (req: Request) => {
    // 1. captchaToken ko destructure karein
    const { email, password, name, captchaToken } = await req.json();

    if (!email || !password || !name || !captchaToken) {
        return ApiResponse.error('Missing Fields or CAPTCHA', 400);
    }

    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const captchaRes = await fetch(googleVerifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
        return ApiResponse.error("Invalid CAPTCHA validation", 400);
    }

    // 4. Existing user check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return ApiResponse.error('User already exists', 400);
    }

    const username = slugify(name, { lower: true }) + '-' + Math.random().toString(36).substring(2, 6);
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        username
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    // 6. Token & Cookie setup
    const token = await signToken({ userId: userResponse._id.toString(), email: userResponse.email });
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return ApiResponse.success(userResponse, 201);
});