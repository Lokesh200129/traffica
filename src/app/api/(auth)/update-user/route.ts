// import { tryCatchWrapper } from "@/lib/try-catch";
import { apiSuccess, apiError } from "@/lib/api-response";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import { cloudinaryConfig } from '@/lib/cloudinary'
import parseError from "@/lib/parse-error";
import withAuth from "@/lib/try-catch-with-auth";
import { hashPassword } from "@/lib/auth";
export const PATCH = withAuth(async (req: NextRequest, user) => {
    cloudinaryConfig();
    const formData = await req.formData();

    const file = formData.get('profileImage') as File | null;
    const removeImage = formData.get('removeImage') === 'true';
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    // const _id = formData.get('_id');
    const _id = user._id;
    const existingUser = await User.findById(_id);
    let imageUrl = existingUser?.profileImage || "";
    const password = formData.get('password') as string;

    if (password && existingUser?.authProvider === 'google') {
        return apiError("Google login users cannot set password", 400);
    }
    // Remove image
    if (removeImage && existingUser?.profileImage) {
        try {
            const publicId = existingUser.profileImage
                .split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            imageUrl = "";
        } catch (err) {
            return parseError(err);
        }
    }

    // Add / Update image
    if (file && file.size > 0) {
        // Delete old image if exists
        if (existingUser?.profileImage) {
            try {
                const publicId = existingUser.profileImage
                    .split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Old image delete failed:", err);
            }
        }

        // Upload new image
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "traffic_profiles" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        imageUrl = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            $set: {
                ...(name && { name }),
                ...(email && { email }),
                ...(password && { password: await hashPassword(password) }),
                profileImage: imageUrl,
            }
        },
        { returnDocument: 'after' }
    ).select('-password');

    return apiSuccess(updatedUser, "User updated successfully", 200);
});