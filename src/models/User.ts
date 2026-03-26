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

        sparse: true,
        unique: true,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    creditBalance: {
        availableCredits: {
            type: Number,
            default: 0,
            min: [0, "Credits cannot be negative"]
        },
        lastAdded: {
            type: Number,
            default: 0
        },
        lastUpdatedAt: {
            type: Date,
            default: Date.now
        }
    },
    profileImage: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;