import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'

console.log(process.env.CONNECTION_URL);
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/contact-list', contactRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(process.env.PORT || 5000, '0.0.0.0', () => console.log(`Server Running on port:  ${process.env.PORT || 5000}`)))
    .catch((error) => console.log(error));
// https://mongodb.com/cloud/atlas