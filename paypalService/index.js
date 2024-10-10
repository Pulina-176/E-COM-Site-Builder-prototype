import "dotenv/config";
import express from "express";
import cors from "cors"
import * as paypal from "./paypal-api.js";
const {PORT = 8888} = process.env;

const app = express();

// parse post params sent in body in json format
app.use(express.json());

app.post("/api/create-order", async (req, res) => {
    try{
        const order = await paypal.createOrder();
    }
    catch(err) {
        console.error(err);
        res.status(500).send(err.message)
    }
});

app.post("/api/create-order", async (req, res)=> {
    const {orderID} = req.body;
    try {
        const captureData = await paypal.capturePayment(orderID);
        res.json(captureData);
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
