import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";

import prodObjRoutes from "./newRoutes/routes-Table-Products.js";
import servObjRoutes from "./newRoutes/routes-Table-Services.js";
import prodRoutes from "./newRoutes/routes-Product-Items.js";
import servRoutes from "./newRoutes/routes-Service-Items.js";
import displayRoutes from "./newRoutes/routes-siteUI.js";
import authRoutes from "./newRoutes/routes-admin-auth.js";
import bookingRoutes from "./newRoutes/routes-bookingservice.js";
import orderRoutes from "./newRoutes/routes-orders.js";

import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();
const mongoDBURL = process.env.mongoDBURL;

//Middleware for parsing request body
app.use(express.json());

app.use(cors({
    origin: {},
    credentials: true,
}));

app.use(cookieParser());

// app.use(
//     cors({
//         origin: "http://localhost:4000//",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('A Product of Trendenshi');
});

app.use('/custom-p-com', prodObjRoutes); //Routes of routes-Table-Products.js
app.use('/custom-s-com', servObjRoutes); //Routes of routes-Table-Services.js
app.use('/products', prodRoutes); //Routes of routes-Product-Objects.js
app.use('/services', servRoutes); //Routes of routes-Service-Objects.js
app.use('/display', displayRoutes); //Routes of routes-siteUI.js
app.use('/admin-auth', authRoutes); //Routes of routes-admin-auth.js
app.use('/book', bookingRoutes); //Routes of routes-bookingservice.js
app.use('/order', orderRoutes); //Routes of routes-orders.js

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App is connected to Database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
        
    })
    .catch((error) => {
        console.log("Error: ",error)
    })
