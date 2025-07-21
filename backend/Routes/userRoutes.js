import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, getLoggedInUser } from '../Controllers/userController.js';
import { authenticateToken } from '../Middleware/authentication.js';
import { admin } from '../Middleware/admin.js';

const userRouter = express.Router();

userRouter.get('/loggedInUser', authenticateToken, getLoggedInUser);

userRouter.get('/', authenticateToken, admin, getAllUsers);
userRouter.get('/:id', authenticateToken, admin, getUserById);
userRouter.put('/:id', authenticateToken, admin, updateUser);
userRouter.delete('/:id', authenticateToken, admin, deleteUser);

export default userRouter;