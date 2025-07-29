import express from 'express';
import { registerUser, loginUser, verifyOtp, resendOtp, forgotPassword, changePassword, adminLogin, forgotPasswordOtp, verifyChangePasswordOtp } from '../Controllers/authController.js';
import { authenticateToken } from '../Middleware/authentication.js';

const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.get('/adminLogin', adminLogin);

authRouter.post('/register', registerUser);
authRouter.get('/resendOtp', authenticateToken, resendOtp);
authRouter.post('/verifyOtp', authenticateToken, verifyOtp);

authRouter.post('/forgotPasswordOtp', forgotPasswordOtp);
authRouter.post('/verifyforgotPasswordOtp', verifyChangePasswordOtp);
authRouter.post('/forgotPassword', forgotPassword);




authRouter.post('/changePassword', authenticateToken, changePassword);

export default authRouter;