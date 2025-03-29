import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other']
        },
        genderPreference: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other']
        },
        bio: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        likes: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        }],
        dislikes: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        }],
        matches: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        }],
    },
    {
        timestamps: true,
    }
)

// Hash password before saving to the database then call the "next" function to continue the middleware chain
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;