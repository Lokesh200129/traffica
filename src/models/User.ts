import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true,
        default: null,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        default: null,
        sparse: true,
        unique: true,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    bio: {
        type: String,
        default: "",
    },
    profileImage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    occupation: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;