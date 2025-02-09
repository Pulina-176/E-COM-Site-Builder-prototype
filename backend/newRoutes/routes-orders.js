import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import { orders } from "../newModels/Orders.js";

const router = express();

// POST route to add new order details into database
router.post("/", async (req, res) => {
    try {
        const { Email, ContactNo, Order, Ordered_date, Total_payed, Address, Zipcode } = req.body;

        // Create a new order record with the provided data
        const newOrder = new orders({
            Email,
            ContactNo,
            Order,
            Ordered_date,
            Total_payed,
            Address,
            Zipcode
        });

        await newOrder.save();

        // Respond with success message
        res.status(201).json({ message: "Service booked successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order in database", error });
    }
});

router.get('/', verifyToken, async(req, res)=>{ //get all current booking requests

    if (req.user.id !== '_jfkeycbx,ootiu') return res.status(401).json({error: 'Unauthorized'})

    try {
        const results = await orders.find({});
        res.json(results);
    } catch (error) {
        res.status(500).send('Error retrieving data from database');
    }

})

// router.delete('/:id/:pk', verifyToken, async(req, res) => { //Delete a booking request

//     if (req.user.id !== '_jfkeycbx,ootiu') return res.status(401).json({error: 'Unauthorized'})

//     const {id, pk} = req.params

//     try {
//         await orders.deleteOne({ ServiceID : id , PK_n : pk });
//         res.send('Request deleted');
//     } catch (error) {
//         res.status(500).send('Error deleting service');
//     }
// })

export default router;