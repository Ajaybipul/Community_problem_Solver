import { Router } from "express";
import { register, login, updateProfile, registerVolunteer, applyVolunteerForExistingUser, getMe, getProfileStats } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post('/register', register)
router.post('/register-volunteer', registerVolunteer)
router.post('/volunteer-apply', authMiddleware, applyVolunteerForExistingUser)
router.post('/login', login)
router.get('/profile-stats', authMiddleware, getProfileStats)
router.put('/profile', authMiddleware, updateProfile)
router.get('/me', authMiddleware, getMe)


export default router