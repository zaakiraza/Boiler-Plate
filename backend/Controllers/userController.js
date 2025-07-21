import user from '../Models/userModel.js';
import { successHandler, errorHandler } from '../Utils/responseHandler.js';

export const getAllUsers = async (req, res) => {
    const allUsers = await user.find().select('-password');
    if (!allUsers) {
        return errorHandler(res, 400, "No user found")
    }
    return successHandler(res, 200, "users finds", allUsers, allUsers.length)
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return errorHandler(res, 400, "Id se required");
    }

    const userDetail = await user.findById(id).select('-password');
    if (!userDetail) {
        return errorHandler(res, 400, "InValid Id");
    }

    return successHandler(res, 200, "users finds", userDetail, userDetail.length);
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { userName } = req.body;

    if (!id) {
        return errorHandler(res, 400, "Id se required");
    }

    if (!userName) {
        return errorHandler(res, 400, "Feilds are missing to change");
    }

    const userDetail = await user.findById(id);
    if (!userDetail) {
        return errorHandler(res, 400, "InValid Id");
    }
    userDetail.userName = userName;
    await userDetail.save();

    return successHandler(res, 200, "user updated successfully");
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return errorHandler(res, 400, "Id se required");
    }

    const userDelete = await user.findByIdAndDelete(id);
    if (!userDelete) {
        return errorHandler(res, 400, "InValid user");
    }

    return successHandler(res, 200, "user deleted successfully");
}

export const getLoggedInUser = async (req, res) => {
    const userId = req.user;
    try {
        const loggedInUser = await user.findById(userId.userId).select('-password -createdAt -updatedAt -isAdmin');
        if (!loggedInUser) {
            return errorHandler(res, 400, "User not found");
        }
        return successHandler(res, 200, "User found successfully", loggedInUser, 1);

    }
    catch (e) {
        return errorHandler(res, 400, "Cannot find the user", e.message);
    }
}