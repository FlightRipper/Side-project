import express from 'express';
import memesController from '../controllers/MemeController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';

const memeRouter = express.Router();

// Create a new campaign
memeRouter.post('/:userId', protect, upload.single('image'), memesController.createMeme);

// Get all campaigns
memeRouter.get('/', memesController.getAllMemes);

//get a campaign by ID
memeRouter.get('/:id', memesController.findMemeById);

//update campaign
memeRouter.patch('/:id', protectCreator, upload.single('image'), memesController.updateMeme);

//delete a campaign
memeRouter.delete('/:id', protectCreator, memesController.deleteMeme);

export default memeRouter;