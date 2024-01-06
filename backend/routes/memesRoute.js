import express from 'express';
import memesController from '../controllers/MemeController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';

const memeRouter = express.Router();

// Create a new meme
memeRouter.post('/:userId', protectCreator, upload.single('image'), memesController.createMeme);

// Get all meme
memeRouter.get('/', protect, memesController.getAllMemes);

// Get all meme Created by user for the admin panel
memeRouter.get('/:id', protectCreator, memesController.getAllMemesByUser);

//get a meme by ID
memeRouter.get('/:id', protect, memesController.findMemeById);

//update meme
memeRouter.patch('/:id', protectCreator, upload.single('image'), memesController.updateMeme);

//delete a meme
memeRouter.delete('/:id', protectCreator, memesController.deleteMeme);

export default memeRouter;