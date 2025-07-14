import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowerCase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        phone: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
        },
        otpExpiresAt: {
            type: Date,
        }
    },
    { timestamps: true }
)

export default mongoose.model("user", userSchema);