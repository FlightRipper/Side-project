import express from 'express';
import usersController from '../controllers/UserController.js';
import protect from '../middlewares/authMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';

const userRouter = express.Router();

// Create a new user
userRouter.post('/register', usersController.createUser);

//login user
userRouter.post('/login', usersController.loginUser);

//login admin
userRouter.post('/Adminlogin', usersController.loginCreator);

// Get all users
userRouter.get('/', protectCreator, usersController.getAllUsers);

//get a user by ID
userRouter.get('/:id', protect, usersController.findUserById);

//update user
userRouter.patch('/:id', protect, usersController.updateUser);

//delete a user
userRouter.delete('/:id', protect, usersController.deleteUser);

export default userRouter;