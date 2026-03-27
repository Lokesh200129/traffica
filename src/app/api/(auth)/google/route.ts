import { apiError, apiSuccess } from "@/lib/api-response";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { tryCatchWrapper } from "@/lib/try-catch";
import slugify from "slugify";

export const POST = tryCatchWrapper(async (req: Request) => {
    const { token } = await req.json();

    if (!token) {
        return apiError("Google token is missing", 400);
    }

    // access_token se userinfo fetch karo
    const googleRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!googleRes.ok) {
        return apiError("Invalid Google token", 401);
    }

    const payload = await googleRes.json();

    if (!payload.email) {
        return apiError("Could not fetch Google user info", 401);
    }

    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {

        const username = slugify(name, { lower: true }) + '-' + Math.random().toString(36).substring(2, 6);
        user = await User.create({
            username,
            email,
            name,
            profileImage: picture,
            googleId,
            authProvider: "google",
            password: null,
        });
    } else if (user.authProvider === "local") {
        return apiError("Email already registered. Please login with password.", 409);
    } else {
        if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }
    }

    const jwtToken = await signToken({
        userId: user._id.toString(),
        email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    const userData = user.toObject();
    delete userData?.password;

    return apiSuccess(userData, "Google login successful", 200);
});