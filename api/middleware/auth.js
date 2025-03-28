import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Get token from cookies
        // Need cookieParser middleware in server.js
        const token = req.cookies.jwt;

        // Check if token is provided
        if ( !token ) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised - No token provided",
            })
        }

        // If user provided token but changed
        // the token in the client side, we need to verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if ( !decoded ) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised - Invalid token",
            })
        }

        // Check if user exists in the database
        const currentUser = await User.findById(decoded.id);

        req.user = currentUser;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised - Invalid token",
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }
}