// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();

// // import prodObjRoutes from "./newRoutes/routes-Table-Products.js";
// // import servObjRoutes from "./newRoutes/routes-Table-Services.js";
// // import prodRoutes from "./newRoutes/routes-Product-Items.js";
// // import servRoutes from "./newRoutes/routes-Service-Items.js";
// // import displayRoutes from "./newRoutes/routes-siteUI.js";

// // Adjust the import paths to be absolute
// import prodObjRoutes from path.join(__dirname, "newRoutes", "routes-Table-Products.js");
// import servObjRoutes from path.join(__dirname, "newRoutes", "routes-Table-Services.js");
// import prodRoutes from path.join(__dirname, "newRoutes", "routes-Product-Items.js");
// import servRoutes from path.join(__dirname, "newRoutes", "routes-Service-Items.js");
// import displayRoutes from path.join(__dirname, "newRoutes", "routes-siteUI.js");

// import cors from 'cors';

// const PORT = process.env.PORT || 5000;

// const app = express();
// const mongoDBURL = process.env.mongoDBURL;

// //Middleware for parsing request body
// app.use(express.json());

// app.use(cors());

// // app.use(
// //     cors({
// //         origin: "http://localhost:4000//",
// //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //         allowedHeaders: ['Content-Type']
// //     })
// // );

// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send('Welcome to MERN Stack Tutorial')
// });

// app.use('/custom-p-com', prodObjRoutes); //Routes of routes-Table-Products.js
// app.use('/custom-s-com', servObjRoutes); //Routes of routes-Table-Services.js
// app.use('/products', prodRoutes); //Routes of routes-Product-Objects.js
// app.use('/services', servRoutes); //Routes of routes-Service-Objects.js
// app.use('/display', displayRoutes); //Routes of routes-siteUI.js

// mongoose
//     .connect(mongoDBURL)
//     .then(() => {
//         console.log(`App is connected to Database`);
//         app.listen(PORT, () => {
//             console.log(`App listening to port: ${PORT}`);
//         })
        
//     })
//     .catch((error) => {
//         console.log(error)
//     })

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
const mongoDBURL = process.env.mongoDBURL;

//Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Use dynamic import for routes
(async () => {
    const prodObjRoutes = await import(pathToFileURL(path.join(__dirname, 'newRoutes', 'routes-Table-Products.js')));
    const servObjRoutes = await import(pathToFileURL(path.join(__dirname, 'newRoutes', 'routes-Table-Services.js')));
    const prodRoutes = await import(pathToFileURL(path.join(__dirname, 'newRoutes', 'routes-Product-Items.js')));
    const servRoutes = await import(pathToFileURL(path.join(__dirname, 'newRoutes', 'routes-Service-Items.js')));
    const displayRoutes = await import(pathToFileURL(path.join(__dirname, 'newRoutes', 'routes-siteUI.js')));

    app.use('/custom-p-com', prodObjRoutes.default); //Routes of routes-Table-Products.js
    app.use('/custom-s-com', servObjRoutes.default); //Routes of routes-Table-Services.js
    app.use('/products', prodRoutes.default); //Routes of routes-Product-Objects.js
    app.use('/services', servRoutes.default); //Routes of routes-Service-Objects.js
    app.use('/display', displayRoutes.default); //Routes of routes-siteUI.js

    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log(`App is connected to Database`);
            app.listen(PORT, () => {
                console.log(`App listening to port: ${PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
        });
})();

