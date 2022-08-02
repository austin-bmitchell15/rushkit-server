import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/contact-list', contactRoutes);

const CONNECTION_URL = "mongodb+srv://technologychair:Carnation@cluster0.qlkh9.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server Running on port:  ${PORT}`)))
    .catch((error) => console.log(error));
// https://mongodb.com/cloud/atlas