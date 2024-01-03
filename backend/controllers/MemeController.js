import Meme from '../models/MemeModel.js';
import User from '../models/UserModel.js';
import fs from 'fs';
import path from 'path';

class memesController {

    //create meme
    static async createMeme(req, res) {
        try {
            const image = req.file.filename;
            const user = await User.findByPk(req.params.userId);
            if (!user) {
                return res.status(404).json('User not found');
            }
            const newMeme = await Meme.create({ ...req.body, image: image });
            if (!newMeme) {
                return res.status(400).json('Meme creation failed');
            }
            await newMeme.setUser(user);

            req.io.emit('newMeme', {
                message: `A new meme has been created by ${user.username}`,
                memeId: newMeme.id,
            });

            return res.status(201).json(newMeme);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async getAllMemes(req, res) {
        try {
            const memes = await Meme.findAll({
                include: [
                { model: User, attributes: ['username'] },
                ],
            });
            if (memes.length === 0) {
                return res.status(404).json('there are no available memes');
            }
            return res.status(200).json(memes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllMemesByUser(req, res) {
        try {
            const userId = req.params.userId;
            const memes = await Meme.findAll({
                where: {
                    userId: userId
                },
                include: [
                { model: User, attributes: ['username'] },
                ],
            });
            if (memes.length === 0) {
                return res.status(404).json('there are no available memes for this user');
            }
            return res.status(200).json(memes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //update meme
    static async updateMeme(req, res) {
        try {
        const oldMeme = await Meme.findByPk(req.params.id);
        const oldImage = oldMeme.image;

        const newData = { ...req.body };

        if (req?.file?.filename) {
            newData.image = req?.file?.filename;
        }

        const [updatedMeme] = await Meme.update(newData, {
            where: {
            id: req.params.id,
            },
        });

        if (!updatedMeme) {
            return res.status(404).json("please enter the fields you want to edit");
        }

        if (oldImage) {
            const oldImagePath = path.join("/uploads", "uploads", oldImage);
            if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            } else {
            console.error("File not found:", oldImagePath);
            }
        }
        const newMeme = await Meme.findByPk(req.params.id);

        return res.status(200).json(newMeme);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //delete meme
    static async deleteMeme(req, res) {
        try {
        const deletedMeme = await Meme.findByPk(req.params.id)
        
        if (!deletedMeme) {
            return res.status(404).json('Meme was not found');
        }

        const imageToDelete = deletedMeme.image

        await Meme.destroy({
            where: {
            id: req.params.id,
            },
        });
        if (imageToDelete) {
            const imagePath = path.join('./uploads', imageToDelete);
            fs.unlinkSync(imagePath);
        }
        
        return res.status(200).json({ deletedMeme });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    // find meme by specific id
    static async findMemeById(req, res) {
        try {
        const meme = await Meme.findByPk(req.params.id);
        if (!meme) {
            return res.status(404).json('Meme not found');
        }
        return res.status(200).json(meme);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }
}

export default memesController;