import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const updateProfile = async (req, res) => {
    // user send img => upload to cloudinary => get url => save to db
    try {
        const {image, ...otherData} = req.body;

        let updatedData = {...otherData, image: ""};

        // TODO
        if (image) {
            // base64 image => upload to cloudinary
            if (image.startsWith("data:image")) {
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image, )

                    updatedData.image = uploadResponse.secure_url;
                } catch (error) {
                    console.log("Error in uploading image to cloudinary: ", error);
                    return res.status(500).json({
                        success: false,
                        message: "Error uploading image",
                    });
                }
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {new: true});

        res.status(200).json({
            success: true,
            message: "Update profile successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("Error in updatedProfile", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}