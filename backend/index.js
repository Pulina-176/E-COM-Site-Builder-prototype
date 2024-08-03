import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import prodObjRoutes from "./newRoutes/routes-Table-Products.js";
import servObjRoutes from "./newRoutes/routes-Table-Services.js";
import prodRoutes from "./newRoutes/routes-Product-Items.js";
import servRoutes from "./newRoutes/routes-Service-Items.js";
import displayRoutes from "./newRoutes/routes-siteUI.js";

import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();
const mongoDBURL = process.env.mongoDBURL;

//Middleware for parsing request body
app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: "http://localhost:4000//",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial')
});

app.use('/custom-p-com', prodObjRoutes); //Routes of routes-Table-Products.js
app.use('/custom-s-com', servObjRoutes); //Routes of routes-Table-Services.js
app.use('/products', prodRoutes); //Routes of routes-Product-Objects.js
app.use('/services', servRoutes); //Routes of routes-Service-Objects.js
app.use('/display', displayRoutes); //Routes of routes-siteUI.js

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App is connected to Database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
        
    })
    .catch((error) => {
        console.log(error)
    })
