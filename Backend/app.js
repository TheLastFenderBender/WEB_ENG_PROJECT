const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
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

// Function to hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Manually create an admin user if not exists
User.findOne({ username: 'admin' })
    .then(async existingAdmin => {
        if (!existingAdmin) {
            const hashedPassword = await hashPassword('adminPassword');

            const adminUser = new User({
                username: 'admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                admin: true,
                blocked: false,
            });

            return adminUser.save();
        }
    })
    .then(async () => {
        console.log('Admin user created or already exists');

        // Now, check if 'superadmin' exists
        return User.findOne({ username: 'superadmin' });
    })
    .then(async (existingSuperAdmin) => {
        if (!existingSuperAdmin) {
            const hashedPassword = await hashPassword('superadminPassword');
            const superAdminUser = new User({
                username: 'superadmin',
                email: 'superadmin@gmail.com',
                password: hashedPassword,
                admin: true,
                blocked: false,
            });

            return superAdminUser.save();
        }
    })
    .then(() => {
        console.log('Superadmin user created or already exists');
    })
    .catch(error => {
        console.error('Error creating/admin checking users:', error);
    })
    .finally(() => {
        // Start your application after database setup
        app.listen(port, () => console.log(`Server is running on port: ${port}`));

    });
