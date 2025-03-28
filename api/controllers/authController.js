import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    // jwt
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}

// Signin
export const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        if ( !email || !password ) {
            return res.status(400).json({ 
                success: false,
                message: "Please fill all fields", 
            })
        }

        // Check if user exists
        const user = await User.findOne({ email }).select("+password");

        if ( !user || !(await user.matchPassword(password)) ) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
        }

        // Create token and send it in a cookie
        const token = signToken(user._id)

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in miliseconds
            httpOnly: true, // prevents XSS attacks
            sameSite: "strict", // prevents CSRF attacks
            secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
        });
        
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log("Error in signin controller: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

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
export const signout = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })
    res.status(200).json({
        success: true,
        message: "User signed out successfully",
    })
}