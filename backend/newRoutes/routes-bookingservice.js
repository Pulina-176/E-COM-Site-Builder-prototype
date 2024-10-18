import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import { bookedService } from "../newModels/Booked-Services.js";

const router = express();

// POST route to request a new service (for the users)
router.post("/", async (req, res) => {
    try {
        const { ServiceID, PK_n, title, fullName, email, phone, address, note } = req.body;

        // Create a new booked service with the provided data
        const newService = new bookedService({
            ServiceID,
            PK_n,
            title,
            fullName,
            email,
            phone,
            address,
            note
        });

        // Save the booked service to the database
        await newService.save();

        // Respond with success message
        res.status(201).json({ message: "Service booked successfully", service: newService });
    } catch (error) {
        // Handle errors and respond with failure message
        res.status(500).json({ message: "Error booking service", error });
    }
});

router.get('/', verifyToken, async(req, res)=>{ //get all current booking requests

    if (req.user.id !== '_jfkeycbx,ootiu') return res.status(401).json({error: 'Unauthorized'})

    try {
        const results = await bookedService.find({});
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving data from database');
    }

})

router.delete('/:id/:pk', verifyToken, async(req, res) => { //Delete a booking request

    if (req.user.id !== '_jfkeycbx,ootiu') return res.status(401).json({error: 'Unauthorized'})

    const {id, pk} = req.params

    try {
        await bookedService.deleteOne({ ServiceID : id , PK_n : pk });
        res.send('Request deleted');
    } catch (error) {
        res.status(500).send('Error deleting service');
    }
})

export default router;