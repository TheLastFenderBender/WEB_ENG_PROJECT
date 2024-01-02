const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;
require('dotenv').config();


// Connect to MongoDB
mongoose.connect('mongodb+srv://Umar:SqYDMM4X6Zu364SR@umar.ucbzkh6.mongodb.net/Airline');
mongoose.connection.once('open', () => { console.log('Connected to MongoDB Successfully') });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => console.log(`Server is running on port: ${port}`));