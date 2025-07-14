import verify from 'jsonwebtoken';
import { successHandler, errorHandler } from '../Utils/responseHandler.js';
import user from '../Models/userModel.js';

export const admin = async (req, res, next) => {
    const userId = req.user
    try {
        const userDetail = await user.findById(userId.userId);
        if (!userDetail) {
            return errorHandler(res, 400, "Invalid user");
        }
        if (!userDetail.isAdmin) {
            return errorHandler(res, 403, "Access denied: Admins only");
        }

        req.user = userDetail;
        
        next();
    }
    catch (err) {
        errorHandler(res, 401, "Unauthorized: Invalid token");
    }
};
