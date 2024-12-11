import "dotenv/config";
import express from "express";
import cors from "cors"
import axios from "axios"
const {PORT = 8888} = process.env;

import stripe from 'stripe';

const app = express();

// parse post params sent in body in json format
app.use(express.json());

// enable cors
app.use(cors({ origin: process.env.DOMAIN })); // Allow requests from your frontend origin


// Stripe API

let stripeGateway = stripe(process.env.stripe_key)

let DOMAIN = process.env.DOMAIN;
let SERVICE = process.env.SERVICE;
let BACKEND_SERVICE = process.env.BACKEND_SERVICE;

app.post('/stripe-checkout', async (req, res) => {
    try{
        const session = await stripeGateway.checkout.sessions.create({
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true,
            },
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${SERVICE}/success?session_id={CHECKOUT_SESSION_ID}&order=${req.body}`,
            cancel_url: `${DOMAIN}/cart`,
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'lkr',
                        product_data: {
                            name: item.title,
                            images: [item.image],
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }
            })
        });
        res.json(303, session.url);
        console.log(session.url)
        console.log("passed")
    }
    catch(err){
    console.error(err);
    res.status(500).send(err.message);
    }
});


app.get('/success', async (req, res) => {
    let {order, session_id} = req.query;

    try {
        const session = await stripeGateway.checkout.sessions.retrieve(session_id);
        const customer_details = session.customer_details;

        let date = new Date();
        console.log(order)

        // let orderDetails = {
        //     Email: customer_details.email,
        //     ContactNo: customer_details.phone,
        //     Order: order,
        //     Ordered_date: date.getTime(),
        //     Total_payed: session.amount_total / 100
        // }

        // try {
        //     const response = await axios.post(`${BACKEND_SERVICE}/order`, orderDetails);
        //     console.log('Order posted successfully:', response.data);
        // } catch (axiosError) {
        //     console.error('Error posting order to backend:', axiosError.message);
        //     // log more details:
        //     if (axiosError.response) {
        //         console.error('Response data:', axiosError.response.data);
        //         console.error('Status:', axiosError.response.status);
        //     }
        // }

        // res.redirect(`${DOMAIN}/cart`)
    } catch (err){
        console.log("Fucking error", err)
    }

})

// // PayPal API

// app.post("/api/create-order", async (req, res) => {
//     try{
//         const order = await paypal.createOrder();
//     }
//     catch(err) {
//         console.error(err);
//         res.status(500).send(err.message)
//     }
// });

// app.post("/api/create-order", async (req, res)=> {
//     const {orderID} = req.body;
//     try {
//         const captureData = await paypal.capturePayment(orderID);
//         res.json(captureData);
//     }
//     catch (err) {
//         res.status(500).send(err.message)
//     }
// })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})