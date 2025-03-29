import User from "../models/user.model.js"

export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId);

        // Check if the liked user exists
        if (!likedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the liked user already exists in the current user's likes
        if (!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId);
            await currentUser.save();

            // Check if the liked user has already liked the current user
            if (likedUser.likes.includes(currentUser._id)) {
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser._id);

                // Save both users at the same time
                await Promise.all([
                    currentUser.save(),
                    likedUser.save(),
                ]);
            }

            // TODO SEND NOTI IF IT IS A MATCH => USE SOCKET.IO
        }

        res.status(200).json({
            success: true,
            user: currentUser,
            message: "User liked successfully",
        });
    } catch (error) {
        console.error("Error swiping right:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
        });
    }
}

export const swipeLeft = async (req, res) => {
    try {
        const { dislikedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);

        // Check if the disliked user exists
        if (!currentUser.dislikes.includes(dislikedUserId)) {
            currentUser.dislikes.push(dislikedUserId);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            user: currentUser,
            message: "User disliked successfully",
        });

    } catch (error) {
        console.error("Error swiping left:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
        });
    }
}

export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("matches", "name image");

        res.status(200).json({
            success: true,
            matches: user.matches,
        });

    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserProfiles = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);

        const users = await User.find({
            $and: [
                { _id: { $ne: currentUser._id } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.dislikes } },
                { _id: { $nin: currentUser.matches } },
            
                {
                    gender:
                        currentUser.genderPreference === "both" 
                            ? { $in: ["male", "female"] } 
                            : currentUser.genderPreference, 
                },
                { genderPreference: {$in: [currentUser.gender, "both"]} },
            ],
        })

        res.status(200).json({
            success: true,
            users,
        });

    } catch (error) {
        console.error("Error fetching user profiles:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
}