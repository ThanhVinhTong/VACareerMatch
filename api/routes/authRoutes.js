import express from 'express';
import { signin, signup, signout } from '../controllers/authController.js';
import { protectRoute } from '../middleware/auth.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

router.merge("/me", protectRoute, (req,res) => {
    res.send({
        success: true,
        user: req.user,
    })
})

export default router;