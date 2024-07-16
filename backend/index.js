import express, { response } from "express"; // framework
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();


// ------------ MIDDLEWARE ------------ 

// Middleware for parsing request body
app.use(express.json());

// Middleware for cors policy

// Option 1: Allow all origins with default cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:5000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
// ------------------------------------

// -------------- ROUTES -------------- 
// home page
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('MERN BookStore App');
});

app.use('/books', booksRoute);
// ------------------------------------

// connect to MongoDB
mongoose
    .connect(MongoDBURL)
    .then(() => {
        console.log('App connected to database');
        // connect to db before running the app
        // port listener function
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); // Use backticks to use template literals
        });
    }).catch((err) => {
        console.log(err);
    });



// "npm run dev" to start server