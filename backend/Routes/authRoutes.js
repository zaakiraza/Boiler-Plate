import express from 'express';
import { registerUser, loginUser, verifyOtp, resendOtp, forgotPassword, changePassword, adminLogin } from '../Controllers/authController.js';
import { admin } from '../Middleware/admin.js';
import { authenticateToken } from '../Middleware/authentication.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/adminLogin', adminLogin);

// Protected routess
authRouter.get('/resendOtp', authenticateToken, resendOtp);
authRouter.post('/verifyOtp', authenticateToken, verifyOtp);
authRouter.post('/forgotPassword', authenticateToken, forgotPassword);
authRouter.post('/changePassword', authenticateToken, changePassword);

export default authRouter;