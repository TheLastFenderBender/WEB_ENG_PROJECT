const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Airline', { useNewUrlParser: true });
mongoose.connection.once('open', () => { console.log('Connected to MongoDB Successfully') });


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);


// Authentication middleware
let AuthenticateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const user = await User.findById(decoded.userId);
        if (!user || user.status === 'blocked') {
            return res.status(401).json({ message: 'Unauthorized - Invalid user or blocked' });
        }

        // Attach the decoded user information to the request for later use
        req.User = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized - Token expired' });
        }
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

// Function to hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Initialize admin and superadmin
const initializeAdminAndSuperAdmin = async () => {
    try {
        const adminUser = await User.findOne({ username: 'admin_1' });
        const superAdminUser = await User.findOne({ username: 'superadmin_1' });

        if (!adminUser) {
            const hashedAdminPassword = await hashPassword('adminPassword');
            const newAdminUser = new User({
                name: 'Admin ',
                username: 'admin_1',
                email: 'admin@gmail.com',
                password: hashedAdminPassword,
                role: 'admin',
                blocked: false,
            });
            await newAdminUser.save();
            console.log('Admin user created');
        }

        if (!superAdminUser) {
            const hashedSuperAdminPassword = await hashPassword('superadminPassword');
            const newSuperAdminUser = new User({
                name: 'Superadmin',
                username: 'superadmin_1',
                email: 'superadmin@gmail.com',
                password: hashedSuperAdminPassword,
                role: 'superadmin',
                // admin: true,
                // superadmin: true,
                blocked: false,
            });
            await newSuperAdminUser.save();
            console.log('Superadmin user created');
        }
    } catch (error) {
        console.error('Error creating admin and superadmin users:', error);
    }
};

// Manually create admin and superadmin users
initializeAdminAndSuperAdmin();

// Continue with the rest of your setup and starting the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));