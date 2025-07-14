import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../Controllers/userController.js';
import { authenticateToken } from '../Middleware/authentication.js';
import { admin } from '../Middleware/admin.js';

const userRouter = express.Router();

userRouter.get('/', authenticateToken, admin, getAllUsers);
userRouter.get('/:id', authenticateToken, admin, getUserById);
userRouter.put('/:id', authenticateToken, admin, updateUser);
userRouter.delete('/:id', authenticateToken, admin, deleteUser);

export default userRouter;