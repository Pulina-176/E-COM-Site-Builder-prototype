import express from 'express';
import { display } from '../newModels/siteUI.js';

const router = express.Router();

router.patch('/', async (req, res) => {
    const { Landing, Other, colortheme, Carousel } = req.body;
    const id = "one"; 

    try {
        const updated = await display.findOneAndUpdate(
            { id: "one" }, // Match the document with id "one"
            { id, Landing, Other, colortheme, Carousel }, // Update the document with the new values
            { new: true, upsert: true } // Create if not found
        );
        res.send(updated);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

router.get('/', async (req, res) => {
    try {
        const found = await display.findOne({ id: "one" });
        res.send(found);
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});

export default router;