import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    // jwt
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}

// Signin
export const signin = async (req, res) => {}

// Signup
export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body
    try {
        if ( !name || !email || !password || !age || !gender || !genderPreference ) {
            return res.status(400).json({ 
                success: false,
                message: "Please fill all fields", 
            })
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: "Password must be at least 6 characters", 
            })
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference
        })

        const token = signToken(newUser._id)

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in miliseconds
            httpOnly: true, // prevents XSS attacks
            sameSite: "strict", // prevents CSRF attacks
            secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
        });

        res.status(201).json({
            success: true,
            user:newUser,
            message: "User created successfully",
        })

    } catch (error) {
        console.log("Error in signup: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

// Signout
export const signout = async (req, res) => {}